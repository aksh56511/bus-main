const Route = require('../models/Route');
const Stop = require('../models/Stop');
const Bus = require('../models/Bus');

// Find routes between two stops
exports.findRoutes = (req, res) => {
  try {
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ error: 'Both from and to parameters are required' });
    }

    const stops = Stop.getAllStops();
    const routes = Route.getAllRoutes();
    const buses = Bus.getAllBuses();

    // Find stops that match the query (case-insensitive partial match)
    const fromStop = stops.find(s => 
      s.name.toLowerCase().includes(from.toLowerCase()) ||
      s.location.toLowerCase().includes(from.toLowerCase())
    );
    
    const toStop = stops.find(s => 
      s.name.toLowerCase().includes(to.toLowerCase()) ||
      s.location.toLowerCase().includes(to.toLowerCase())
    );

    if (!fromStop || !toStop) {
      return res.status(404).json({ 
        error: 'Stops not found',
        availableStops: stops.map(s => ({ id: s.id, name: s.name, location: s.location }))
      });
    }

    // Find direct routes
    const directRoutes = findDirectRoutes(routes, buses, stops, fromStop.id, toStop.id);
    
    // Find routes with one transfer
    const transferRoutes = findTransferRoutes(routes, buses, stops, fromStop.id, toStop.id);

    const allRoutes = [...directRoutes, ...transferRoutes]
      .sort((a, b) => a.totalFare - b.totalFare);

    res.json({
      from: fromStop,
      to: toStop,
      routes: allRoutes.slice(0, 5), // Return top 5 routes
      totalRoutes: allRoutes.length
    });

  } catch (error) {
    console.error('Route finding error:', error);
    res.status(500).json({ error: 'Failed to find routes' });
  }
};

// Find direct routes between two stops
function findDirectRoutes(routes, buses, stops, fromStopId, toStopId) {
  const directRoutes = [];

  for (const route of routes) {
    const fromIndex = route.stops.findIndex(s => s.stopId === fromStopId);
    const toIndex = route.stops.findIndex(s => s.stopId === toStopId);

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      const bus = buses.find(b => b.id === route.busId);
      const routeStops = route.stops.slice(fromIndex, toIndex + 1);
      
      // Calculate distance
      let distance = 0;
      for (let i = fromIndex; i < toIndex; i++) {
        distance += calculateDistance(
          stops.find(s => s.id === route.stops[i].stopId),
          stops.find(s => s.id === route.stops[i + 1].stopId)
        );
      }

      const fare = Math.round(distance * (bus?.farePerKm || 1.2));
      const duration = calculateDuration(route.stops[fromIndex].departureTime, route.stops[toIndex].arrivalTime);

      directRoutes.push({
        type: 'direct',
        routeName: route.name,
        busNumber: bus?.number || 'N/A',
        busType: bus?.type || 'Unknown',
        stops: routeStops.map(s => ({
          ...s,
          stopName: stops.find(st => st.id === s.stopId)?.name || 'Unknown'
        })),
        distance: Math.round(distance),
        duration,
        totalFare: fare,
        frequency: route.frequency,
        amenities: bus?.amenities || [],
        departureTime: route.stops[fromIndex].departureTime,
        arrivalTime: route.stops[toIndex].arrivalTime
      });
    }
  }

  return directRoutes;
}

// Find routes with one transfer
function findTransferRoutes(routes, buses, stops, fromStopId, toStopId) {
  const transferRoutes = [];

  for (const route1 of routes) {
    const fromIndex1 = route1.stops.findIndex(s => s.stopId === fromStopId);
    if (fromIndex1 === -1) continue;

    for (let i = fromIndex1 + 1; i < route1.stops.length; i++) {
      const transferStopId = route1.stops[i].stopId;

      for (const route2 of routes) {
        if (route1.id === route2.id) continue;

        const transferIndex2 = route2.stops.findIndex(s => s.stopId === transferStopId);
        const toIndex2 = route2.stops.findIndex(s => s.stopId === toStopId);

        if (transferIndex2 !== -1 && toIndex2 !== -1 && transferIndex2 < toIndex2) {
          const bus1 = buses.find(b => b.id === route1.busId);
          const bus2 = buses.find(b => b.id === route2.busId);

          // Calculate distances
          let distance1 = 0;
          for (let j = fromIndex1; j < i; j++) {
            distance1 += calculateDistance(
              stops.find(s => s.id === route1.stops[j].stopId),
              stops.find(s => s.id === route1.stops[j + 1].stopId)
            );
          }

          let distance2 = 0;
          for (let j = transferIndex2; j < toIndex2; j++) {
            distance2 += calculateDistance(
              stops.find(s => s.id === route2.stops[j].stopId),
              stops.find(s => s.id === route2.stops[j + 1].stopId)
            );
          }

          const fare1 = Math.round(distance1 * (bus1?.farePerKm || 1.2));
          const fare2 = Math.round(distance2 * (bus2?.farePerKm || 1.2));

          transferRoutes.push({
            type: 'transfer',
            segments: [
              {
                routeName: route1.name,
                busNumber: bus1?.number || 'N/A',
                busType: bus1?.type || 'Unknown',
                from: stops.find(s => s.id === fromStopId)?.name,
                to: stops.find(s => s.id === transferStopId)?.name,
                distance: Math.round(distance1),
                fare: fare1,
                departureTime: route1.stops[fromIndex1].departureTime,
                arrivalTime: route1.stops[i].arrivalTime
              },
              {
                routeName: route2.name,
                busNumber: bus2?.number || 'N/A',
                busType: bus2?.type || 'Unknown',
                from: stops.find(s => s.id === transferStopId)?.name,
                to: stops.find(s => s.id === toStopId)?.name,
                distance: Math.round(distance2),
                fare: fare2,
                departureTime: route2.stops[transferIndex2].departureTime,
                arrivalTime: route2.stops[toIndex2].arrivalTime
              }
            ],
            transferPoint: stops.find(s => s.id === transferStopId)?.name,
            totalDistance: Math.round(distance1 + distance2),
            totalFare: fare1 + fare2,
            totalDuration: calculateDuration(
              route1.stops[fromIndex1].departureTime,
              route2.stops[toIndex2].arrivalTime
            )
          });
        }
      }
    }
  }

  return transferRoutes;
}

// Calculate distance between two stops (simplified - using straight line distance)
function calculateDistance(stop1, stop2) {
  if (!stop1 || !stop2 || !stop1.coordinates || !stop2.coordinates) return 5; // Default 5km
  
  const R = 6371; // Earth's radius in km
  const dLat = (stop2.coordinates.lat - stop1.coordinates.lat) * Math.PI / 180;
  const dLon = (stop2.coordinates.lng - stop1.coordinates.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(stop1.coordinates.lat * Math.PI / 180) * Math.cos(stop2.coordinates.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Calculate duration between two times
function calculateDuration(startTime, endTime) {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  let duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  if (duration < 0) duration += 24 * 60; // Handle overnight trips
  
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

module.exports = exports;

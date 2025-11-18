const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const Bus = require('../models/Bus');

exports.listTrips = (req, res) => {
  try {
    const trips = Trip.getAllTrips();
    res.json({ trips });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list trips' });
  }
};

exports.createTrip = (req, res) => {
  try {
    const payload = req.body || {};
    const trip = Trip.addTrip(payload);
    res.status(201).json({ trip });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create trip' });
  }
};

// Calculate fare estimate for a trip
exports.calculateFare = (req, res) => {
  try {
    const { from, to, busType } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ error: 'Both from and to parameters are required' });
    }

    const stops = Stop.getAllStops();
    const buses = Bus.getAllBuses();

    // Find stops
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

    // Calculate distance (simplified using coordinates)
    const distance = calculateDistance(fromStop, toStop);

    // Get fare rates for different bus types
    const fares = buses
      .reduce((acc, bus) => {
        if (!acc.find(f => f.type === bus.type)) {
          acc.push({
            type: bus.type,
            operator: bus.operator,
            farePerKm: bus.farePerKm,
            totalFare: Math.round(distance * bus.farePerKm),
            amenities: bus.amenities
          });
        }
        return acc;
      }, [])
      .sort((a, b) => a.totalFare - b.totalFare);

    res.json({
      from: fromStop,
      to: toStop,
      distance: Math.round(distance),
      estimatedDuration: estimateDuration(distance),
      fares,
      recommendation: busType ? 
        fares.find(f => f.type.toLowerCase() === busType.toLowerCase()) :
        fares[0] // Recommend cheapest by default
    });

  } catch (error) {
    console.error('Fare calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate fare' });
  }
};

// Calculate distance between two stops
function calculateDistance(stop1, stop2) {
  if (!stop1.coordinates || !stop2.coordinates) return 20; // Default 20km
  
  const R = 6371; // Earth's radius in km
  const dLat = (stop2.coordinates.lat - stop1.coordinates.lat) * Math.PI / 180;
  const dLon = (stop2.coordinates.lng - stop1.coordinates.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(stop1.coordinates.lat * Math.PI / 180) * Math.cos(stop2.coordinates.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Estimate duration based on distance
function estimateDuration(distance) {
  // Average speed: 40 km/h including stops
  const hours = distance / 40;
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
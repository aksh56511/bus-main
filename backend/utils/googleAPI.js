const axios = require('axios');

const KEY = process.env.GOOGLE_API_KEY || '';

exports.autocomplete = async (input) => {
  // simple stub; replace with real Google Places HTTP call
  if (!input) return [];
  return [{ description: `Mock suggestion for "${input}"`, place_id: 'mock1' }];
};

exports.getPlaceDetails = async (placeId) => {
  // stub - replace with actual Google Places details call
  return { placeId, name: 'Mock Place', location: { lat: 0, lng: 0 } };
};

exports.searchNearbyPlaces = async (type, location, radius = 5000) => {
  // stub - replace with Google Places Nearby Search API
  // type examples: lodging, hospital, atm, bank, restaurant
  const mockResults = [
    { name: `Mock ${type} 1`, address: '123 Main St', distance: '0.5 km', rating: 4.5 },
    { name: `Mock ${type} 2`, address: '456 Oak Ave', distance: '1.2 km', rating: 4.2 },
    { name: `Mock ${type} 3`, address: '789 Pine Rd', distance: '2.1 km', rating: 4.8 }
  ];
  return mockResults;
};

exports.searchPlaces = async (query, location) => {
  // stub - replace with Google Places Text Search API
  // query examples: "grocery", "pharmacy", "gas station"
  const mockResults = [
    { name: `${query} Store 1`, address: '321 Market St', distance: '0.8 km', rating: 4.3 },
    { name: `${query} Shop 2`, address: '654 Center Blvd', distance: '1.5 km', rating: 4.6 }
  ];
  return mockResults;
};

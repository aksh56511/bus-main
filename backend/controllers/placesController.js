const googleAPI = require('../utils/googleAPI');

exports.autocomplete = async (req, res) => {
  const q = req.query.q || '';
  const data = await googleAPI.autocomplete(q);
  res.json({ q, data });
};

exports.details = async (req, res) => {
  const placeId = req.query.placeId;
  const data = await googleAPI.getPlaceDetails(placeId);
  res.json({ placeId, data });
};

exports.searchNearby = async (req, res) => {
  const { type, location, radius } = req.query;
  // type can be: lodging, hospital, atm, bank, restaurant, etc.
  const data = await googleAPI.searchNearbyPlaces(type, location, radius);
  res.json({ type, location, data });
};

exports.searchGeneral = async (req, res) => {
  const { query, location } = req.query;
  // General search for places like "grocery", "pharmacy", etc.
  const data = await googleAPI.searchPlaces(query, location);
  res.json({ query, location, data });
};
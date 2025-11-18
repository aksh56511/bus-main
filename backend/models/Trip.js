// Local JSON storage for Trip model
const jsonStorage = require('../utils/jsonStorage');
const readData = jsonStorage.readData;
const writeData = jsonStorage.writeData;
const FILE_NAME = 'trips.json';

function getAllTrips() {
	return readData(FILE_NAME);
}

function addTrip(trip) {
	const trips = readData(FILE_NAME);
	trip.id = Date.now().toString();
	trips.push(trip);
	writeData(FILE_NAME, trips);
	return trip;
}

function getTripById(id) {
	return readData(FILE_NAME).find(trip => trip.id === id);
}

function updateTrip(id, update) {
	const trips = readData(FILE_NAME);
	const idx = trips.findIndex(trip => trip.id === id);
	if (idx === -1) return null;
	trips[idx] = { ...trips[idx], ...update };
	writeData(FILE_NAME, trips);
	return trips[idx];
}

function deleteTrip(id) {
	let trips = readData(FILE_NAME);
	const initialLength = trips.length;
	trips = trips.filter(trip => trip.id !== id);
	writeData(FILE_NAME, trips);
	return trips.length < initialLength;
}

module.exports = {
	getAllTrips,
	addTrip,
	getTripById,
	updateTrip,
	deleteTrip
};

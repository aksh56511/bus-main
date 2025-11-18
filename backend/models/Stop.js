// Local JSON storage for Stop model
const jsonStorage = require('../utils/jsonStorage');
const readData = jsonStorage.readData;
const writeData = jsonStorage.writeData;
const FILE_NAME = 'stops.json';

function getAllStops() {
	return readData(FILE_NAME);
}

function addStop(stop) {
	const stops = readData(FILE_NAME);
	stop.id = Date.now().toString();
	stops.push(stop);
	writeData(FILE_NAME, stops);
	return stop;
}

function getStopById(id) {
	return readData(FILE_NAME).find(stop => stop.id === id);
}

function updateStop(id, update) {
	const stops = readData(FILE_NAME);
	const idx = stops.findIndex(stop => stop.id === id);
	if (idx === -1) return null;
	stops[idx] = { ...stops[idx], ...update };
	writeData(FILE_NAME, stops);
	return stops[idx];
}

function deleteStop(id) {
	let stops = readData(FILE_NAME);
	const initialLength = stops.length;
	stops = stops.filter(stop => stop.id !== id);
	writeData(FILE_NAME, stops);
	return stops.length < initialLength;
}

module.exports = {
	getAllStops,
	addStop,
	getStopById,
	updateStop,
	deleteStop
};

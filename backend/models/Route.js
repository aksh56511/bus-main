// Local JSON storage for Route model
const jsonStorage = require('../utils/jsonStorage');
const readData = jsonStorage.readData;
const writeData = jsonStorage.writeData;
const FILE_NAME = 'routes.json';

function getAllRoutes() {
	return readData(FILE_NAME);
}

function addRoute(route) {
	const routes = readData(FILE_NAME);
	route.id = Date.now().toString();
	routes.push(route);
	writeData(FILE_NAME, routes);
	return route;
}

function getRouteById(id) {
	return readData(FILE_NAME).find(route => route.id === id);
}

function updateRoute(id, update) {
	const routes = readData(FILE_NAME);
	const idx = routes.findIndex(route => route.id === id);
	if (idx === -1) return null;
	routes[idx] = { ...routes[idx], ...update };
	writeData(FILE_NAME, routes);
	return routes[idx];
}

function deleteRoute(id) {
	let routes = readData(FILE_NAME);
	const initialLength = routes.length;
	routes = routes.filter(route => route.id !== id);
	writeData(FILE_NAME, routes);
	return routes.length < initialLength;
}

module.exports = {
	getAllRoutes,
	addRoute,
	getRouteById,
	updateRoute,
	deleteRoute
};

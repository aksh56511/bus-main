// Local JSON storage for User model
const jsonStorage = require('../utils/jsonStorage');
const readData = jsonStorage.readData;
const writeData = jsonStorage.writeData;
const FILE_NAME = 'users.json';

function getAllUsers() {
	return readData(FILE_NAME);
}

function addUser(user) {
	const users = readData(FILE_NAME);
	user.id = Date.now().toString();
	users.push(user);
	writeData(FILE_NAME, users);
	return user;
}

function getUserById(id) {
	return readData(FILE_NAME).find(user => user.id === id);
}

function updateUser(id, update) {
	const users = readData(FILE_NAME);
	const idx = users.findIndex(user => user.id === id);
	if (idx === -1) return null;
	users[idx] = { ...users[idx], ...update };
	writeData(FILE_NAME, users);
	return users[idx];
}

function deleteUser(id) {
	let users = readData(FILE_NAME);
	const initialLength = users.length;
	users = users.filter(user => user.id !== id);
	writeData(FILE_NAME, users);
	return users.length < initialLength;
}

module.exports = {
	getAllUsers,
	addUser,
	getUserById,
	updateUser,
	deleteUser
};

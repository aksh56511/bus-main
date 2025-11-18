// Local JSON storage for Bus model
const jsonStorage = require('../utils/jsonStorage');
const readData = jsonStorage.readData;
const writeData = jsonStorage.writeData;
const FILE_NAME = 'buses.json';

function getAllBuses() {
  return readData(FILE_NAME);
}

function addBus(bus) {
  const buses = readData(FILE_NAME);
  bus.id = Date.now().toString();
  buses.push(bus);
  writeData(FILE_NAME, buses);
  return bus;
}

function getBusById(id) {
  return readData(FILE_NAME).find(bus => bus.id === id);
}

function updateBus(id, update) {
  const buses = readData(FILE_NAME);
  const idx = buses.findIndex(bus => bus.id === id);
  if (idx === -1) return null;
  buses[idx] = { ...buses[idx], ...update };
  writeData(FILE_NAME, buses);
  return buses[idx];
}

function deleteBus(id) {
  let buses = readData(FILE_NAME);
  const initialLength = buses.length;
  buses = buses.filter(bus => bus.id !== id);
  writeData(FILE_NAME, buses);
  return buses.length < initialLength;
}

module.exports = {
  getAllBuses,
  addBus,
  getBusById,
  updateBus,
  deleteBus
};

const fs = require('fs');
const path = require('path');

function getFilePath(fileName) {
  return path.join(__dirname, '../data', fileName);
}

function readData(fileName) {
  const filePath = getFilePath(fileName);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

function writeData(fileName, data) {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readData, writeData };

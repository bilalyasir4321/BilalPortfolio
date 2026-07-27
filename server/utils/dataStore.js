const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data');

function readJson(file) {
  const raw = fs.readFileSync(path.join(dataPath, file), 'utf-8');
  return JSON.parse(raw);
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(dataPath, file), JSON.stringify(data, null, 2));
}

module.exports = { readJson, writeJson, dataPath };

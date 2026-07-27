const { readJson } = require('../utils/dataStore');

exports.getExperience = (req, res) => {
  try {
    const data = readJson('experience.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load experience', error: err.message });
  }
};

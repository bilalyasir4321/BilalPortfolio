const { readJson } = require('../utils/dataStore');

exports.getSkills = (req, res) => {
  try {
    const data = readJson('skills.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load skills', error: err.message });
  }
};

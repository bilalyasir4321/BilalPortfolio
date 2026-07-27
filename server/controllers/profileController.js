const { readJson } = require('../utils/dataStore');

exports.getProfile = (req, res) => {
  try {
    const data = readJson('profile.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile', error: err.message });
  }
};

exports.getStats = (req, res) => {
  try {
    const data = readJson('profile.json');
    res.json({ stats: data.stats });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load stats', error: err.message });
  }
};

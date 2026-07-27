const { readJson, writeJson } = require('../utils/dataStore');

function validateContact(body) {
  const errors = [];
  if (!body.name || body.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('A valid email is required.');
  }
  if (!body.message || body.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }
  return errors;
}

exports.submitContact = (req, res) => {
  const errors = validateContact(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  try {
    const submissionsPath = 'contacts.json';
    let submissions = [];
    try {
      submissions = readJson(submissionsPath);
      if (!Array.isArray(submissions)) submissions = [];
    } catch {
      submissions = [];
    }
    const entry = {
      id: Date.now().toString(),
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      message: req.body.message.trim(),
      createdAt: new Date().toISOString(),
    };
    submissions.push(entry);
    writeJson(submissionsPath, submissions);
    res.status(201).json({ message: 'Message received successfully', id: entry.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save message', error: err.message });
  }
};

exports.getContacts = (req, res) => {
  try {
    let submissions = [];
    try {
      submissions = readJson('contacts.json');
    } catch {
      submissions = [];
    }
    res.json({ submissions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load contacts', error: err.message });
  }
};

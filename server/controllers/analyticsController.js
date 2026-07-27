const { readJson, writeJson } = require('../utils/dataStore');

function loadAnalytics() {
  try {
    return readJson('analytics.json');
  } catch {
    return { visitors: 0, resumeDownloads: 0, projectViews: {}, sectionViews: {} };
  }
}

function saveAnalytics(data) {
  writeJson('analytics.json', data);
}

exports.trackVisit = (req, res) => {
  try {
    const data = loadAnalytics();
    data.visitors = (data.visitors || 0) + 1;
    saveAnalytics(data);
    res.json({ visitors: data.visitors });
  } catch (err) {
    res.status(500).json({ message: 'Failed to track visit', error: err.message });
  }
};

exports.getVisitorCount = (req, res) => {
  try {
    const data = loadAnalytics();
    res.json({ visitors: data.visitors || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load visitor count', error: err.message });
  }
};

exports.trackProjectView = (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ message: 'projectId required' });
    const data = loadAnalytics();
    data.projectViews = data.projectViews || {};
    data.projectViews[projectId] = (data.projectViews[projectId] || 0) + 1;
    saveAnalytics(data);
    res.json({ projectId, views: data.projectViews[projectId] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to track project view', error: err.message });
  }
};

exports.trackResumeDownload = (req, res) => {
  try {
    const data = loadAnalytics();
    data.resumeDownloads = (data.resumeDownloads || 0) + 1;
    saveAnalytics(data);
    res.json({ resumeDownloads: data.resumeDownloads });
  } catch (err) {
    res.status(500).json({ message: 'Failed to track download', error: err.message });
  }
};

exports.getAnalytics = (req, res) => {
  try {
    const data = loadAnalytics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load analytics', error: err.message });
  }
};

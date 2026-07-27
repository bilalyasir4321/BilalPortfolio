const { readJson } = require('../utils/dataStore');

exports.getProjects = (req, res) => {
  try {
    const data = readJson('projects.json');
    const { category, search } = req.query;
    let projects = data.projects;
    if (category && category !== 'All') {
      projects = projects.filter((p) => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }
    res.json({ projects, categories: data.categories });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load projects', error: err.message });
  }
};

exports.getProject = (req, res) => {
  try {
    const data = readJson('projects.json');
    const project = data.projects.find((p) => p.id === req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load project', error: err.message });
  }
};

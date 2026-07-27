const path = require('path');
const fs = require('fs');

exports.downloadCV = (req, res) => {
  const cvPath = path.join(__dirname, '..', 'data', 'Bilal-Yasir-CV.pdf');
  // Track the download
  try {
    const { readJson, writeJson } = require('../utils/dataStore');
    let data = {};
    try {
      data = readJson('analytics.json');
    } catch {
      data = { visitors: 0, resumeDownloads: 0, projectViews: {}, sectionViews: {} };
    }
    data.resumeDownloads = (data.resumeDownloads || 0) + 1;
    writeJson('analytics.json', data);
  } catch {
    // non-blocking
  }

  // If a real PDF exists, send it; otherwise generate a placeholder text file
  if (fs.existsSync(cvPath)) {
    return res.download(cvPath, 'Bilal-Yasir-CV.pdf');
  }

  const placeholder = `Bilal Yasir — Full Stack Developer & AI Assisted Software Engineer
The University of Chenab, Gujrat, Pakistan

This is a placeholder CV. Replace server/data/Bilal-Yasir-CV.pdf with the real file.
`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Bilal-Yasir-CV.pdf"');
  res.send(Buffer.from(placeholder));
};

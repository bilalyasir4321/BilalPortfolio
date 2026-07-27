const express = require('express');
const router = express.Router();
const {
  trackVisit,
  getVisitorCount,
  trackProjectView,
  trackResumeDownload,
  getAnalytics,
} = require('../controllers/analyticsController');

router.route('/visit').post(trackVisit);
router.route('/visitors').get(getVisitorCount);
router.route('/project-view').post(trackProjectView);
router.route('/resume-download').post(trackResumeDownload);
router.route('/').get(getAnalytics);

module.exports = router;

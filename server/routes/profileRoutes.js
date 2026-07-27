const express = require('express');
const router = express.Router();
const { getProfile, getStats } = require('../controllers/profileController');

router.route('/').get(getProfile);
router.route('/stats').get(getStats);

module.exports = router;

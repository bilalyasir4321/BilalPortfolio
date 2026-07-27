const express = require('express');
const router = express.Router();
const { getExperience } = require('../controllers/experienceController');

router.route('/').get(getExperience);

module.exports = router;

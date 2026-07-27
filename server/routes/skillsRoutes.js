const express = require('express');
const router = express.Router();
const { getSkills } = require('../controllers/skillsController');

router.route('/').get(getSkills);

module.exports = router;

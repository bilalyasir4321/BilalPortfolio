const express = require('express');
const router = express.Router();
const { getProjects, getProject } = require('../controllers/projectController');

router.route('/').get(getProjects);
router.route('/:id').get(getProject);

module.exports = router;

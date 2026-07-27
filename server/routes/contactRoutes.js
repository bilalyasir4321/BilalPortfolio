const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitContact, getContacts } = require('../controllers/contactController');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window per IP
  message: { message: 'Too many contact submissions. Please try again later.' },
});

router.route('/').post(contactLimiter, submitContact);
router.route('/').get(getContacts);

module.exports = router;

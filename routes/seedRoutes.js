const express = require('express');
const router = express.Router();
const { createWeeklySubscription } = require('../controllers/seedController.js');

/**
 * @route   POST /api/seed/weekly
 * @desc    Seeds the DB with 7 days of dummy food items
 * @access  Public
 */
router.post('/weekly', createWeeklySubscription);

module.exports = router;

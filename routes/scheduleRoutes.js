const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');


/**
 * @route   GET /api/schedule
 * @desc    Fetch all scheduled food items based on query params like date, time, or time range
 * @query   date=YYYY-MM-DD, time=HH:mm, startDate=YYYY-MM-DD, endDate=YYYY-MM-DD, timeSlot=HH:mm,HH:mm,...
 * @access  Public (or Protected if auth added later)
 */
router.get('/', scheduleController.getSchedule);

/**
 * @route   PUT /api/schedule/:id/reschedule
 * @desc    Reschedule a specific food item to a new date and time
 * @body    { "newDate": "YYYY-MM-DD", "newTime": "HH:mm" }
 * @access  Public
 */
router.put('/:id/reschedule', scheduleController.rescheduleItem);

/**
 * @route   POST /api/schedule/:id/delivered
 * @desc    Mark a specific scheduled item as delivered
 * @access  Public
 */
router.post('/:id/delivered', scheduleController.markAsDelivered);

/**
 * @route   GET /api/schedule/delivered
 * @desc    Retrieve all delivered items, optionally filterable by date, time, and user
 * @query   date=YYYY-MM-DD, time=HH:mm, userId=<UserID>
 * @access  Public
 */
router.get('/delivered', scheduleController.getDeliveredItems);

/**
 * @route   POST /api/schedule/:id/out-of-stock
 * @desc    Mark a specific food item as out of stock, optionally triggering rescheduling
 * @access  Public
 */
router.post('/:id/out-of-stock', scheduleController.markOutOfStock);

module.exports = router;

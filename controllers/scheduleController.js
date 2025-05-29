const Schedule = require('../models/Schedule');

// GET /api/schedule
exports.getSchedule = async (req, res) => {
  try {
    const { date, time, startDate, endDate, timeSlot } = req.query;

    const query = {};

    // Build query
    if (date && time) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.scheduledDate = {
        $gte: startOfDay,
        $lte: endOfDay
      };

      query.scheduledTime = time;
    }

    if (startDate && endDate) {
      query.scheduledDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (timeSlot) {
      const timeArray = timeSlot.split(',');
      query.scheduledTime = { $in: timeArray };
    }

    const items = await Schedule.find(query);

    const now = new Date();

    const processed = items.map(item => {
      const itemDateTime = new Date(item.scheduledDate);
      const [hours, minutes] = item.scheduledTime.split(':');
      itemDateTime.setHours(Number(hours), Number(minutes), 0, 0);

      const availability = itemDateTime > now ? 'active' : 'inactive';

      return {
        ...item._doc,
        availability // Inject the status
      };
    });

    res.json(processed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/schedule/:id/reschedule
exports.rescheduleItem = async (req, res) => {
  try {
    const { newDate, newTime } = req.body;

    // Step 1: Parse date + time into full DateTime object
    const rescheduleDate = new Date(newDate);
    const [hours, minutes] = newTime.split(':');
    rescheduleDate.setHours(Number(hours), Number(minutes), 0, 0);

    const now = new Date();

    // Step 2: Check if target time is in the past
    if (rescheduleDate <= now) {
      return res.status(400).json({
        message: 'Selected slot is inactive. Please choose a future time.'
      });
    }

    // Step 3: Update the item
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        scheduledDate: new Date(newDate),
        scheduledTime: newTime,
        status: 'scheduled'
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json({
      message: 'Rescheduled successfully',
      updated
    });
  } catch (err) {
    console.error('Reschedule error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// POST /api/schedule/:id/delivered
exports.markAsDelivered = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        status: 'delivered',
        ...(rating !== undefined && { rating }),
        ...(review && { review }),
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET /api/schedule/delivered
exports.getDeliveredItems = async (req, res) => {
  try {
    const query = { status: 'delivered' };
    const { date, time, userId } = req.query;

    if (userId) query.userId = userId;
    if (date) query.scheduledDate = new Date(date);
    if (time) query.scheduledTime = time;

    const items = await Schedule.find(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/schedule/:id/out-of-stock
exports.markOutOfStock = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      { status: 'out-of-stock' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

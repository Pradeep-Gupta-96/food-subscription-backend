const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: new mongoose.Types.ObjectId('6655a661ebf30dfd0fd8b123')  // dummy userId
  },
  foodItem: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  nutrition: {
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'delivered', 'out-of-stock'],
    default: 'scheduled',
  },
  rating: Number,
  review: String,
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);


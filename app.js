const express = require('express');
const cors = require('cors');
const app = express();
const seedRoutes = require('./routes/seedRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); 
app.use(express.json());

// Add this after other app.use()
app.use('/api/seed', seedRoutes);

// Routes
app.use('/api/schedule', scheduleRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
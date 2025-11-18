const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, 'config', 'keys.env') });
const { connectDB } = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Database health check
app.get('/api/db-check', async (req, res) => {
  try {
    const { sequelize } = require('./config/db');
    await sequelize.authenticate();
    res.json({ 
      status: 'SQLite database connected',
      storage: 'database',
      dialect: 'sqlite'
    });
  } catch (err) {
    res.json({ 
      status: 'Using JSON storage (SQLite not connected)',
      storage: 'json',
      message: 'Server is running normally with file-based storage'
    });
  }
});

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/routes', require('./routes/routeRoutes'));
app.use('/api/places', require('./routes/placesRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test: http://localhost:${PORT}/health`);
    console.log(`DB Check: http://localhost:${PORT}/api/db-check`);
  });
})();

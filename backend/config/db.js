const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database - stored in backend/data folder
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../data/database.sqlite'),
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite database connected');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database tables synced');
  } catch (err) {
    console.warn('Database connection error:', err.message);
    console.warn('Continuing with JSON storage fallback...');
  }
};

module.exports = { sequelize, connectDB };

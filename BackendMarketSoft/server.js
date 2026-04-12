const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const { connectDB, sequelize } = require('./src/config/database');
const routes = require('./src/routes');
const swaggerSpec = require('./src/swagger/swagger');
const seedDatabase = require('./src/seed');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MarketSoft API Documentation'
}));

// API Routes
app.use('/api', routes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'MarketSoft API - Supermarket Management System',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server and sync database
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Sync database models (creates tables if they don't exist)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synchronized');

    // Seed database with sample data (development only)
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    }

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;

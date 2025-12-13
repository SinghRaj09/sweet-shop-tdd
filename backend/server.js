const app = require('./app');
const { initializeDatabase } = require('./src/database/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database tables
    await initializeDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log('🍬 Sweet Shop API Server');
      console.log('='.repeat(50));
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✅ Database: ${process.env.DB_NAME || 'sweet_shop'}`);
      console.log('='.repeat(50));
      console.log('📚 API Endpoints:');
      console.log(`   - Health Check: http://localhost:${PORT}/health`);
      console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
      console.log(`   - Sweets: http://localhost:${PORT}/api/sweets`);
      console.log('='.repeat(50));
      console.log('🔐 Default Admin Credentials:');
      console.log('   Email: admin@sweetshop.com');
      console.log('   Password: Admin@123');
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();

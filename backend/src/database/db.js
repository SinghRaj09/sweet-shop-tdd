const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'sweet_shop',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index for faster email lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    // Create sweets table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sweets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index for category searches
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_sweets_category ON sweets(category);
    `);

    // Create index for name searches
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_sweets_name ON sweets(name);
    `);

    // Create purchases table (for tracking purchase history)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS purchases (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        sweet_id INTEGER REFERENCES sweets(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        total_price DECIMAL(10, 2) NOT NULL,
        purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create trigger to update updated_at timestamp
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_sweets_updated_at ON sweets;
      CREATE TRIGGER update_sweets_updated_at
        BEFORE UPDATE ON sweets
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('✅ Database tables initialized successfully');

    // Create default admin user if not exists
    const adminCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      ['admin@sweetshop.com']
    );

    if (adminCheck.rows.length === 0) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      
      await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Admin', 'admin@sweetshop.com', hashedPassword, 'admin']
      );
      
      console.log('✅ Default admin user created');
      console.log('   Email: admin@sweetshop.com');
      console.log('   Password: Admin@123');
    }

    // Insert sample sweets if table is empty
    const sweetCount = await pool.query('SELECT COUNT(*) FROM sweets');
    if (parseInt(sweetCount.rows[0].count) === 0) {
      const sampleSweets = [
        ['Chocolate Truffle', 'Chocolate', 70, 50, 'Rich dark chocolate truffle with cocoa powder coating', 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'],
        ['Gulab Jamun', 'Indian', 50, 100, 'Soft milk-solid-based sweet soaked in sugar syrup', 'https://images.unsplash.com/photo-1589301760014-6e6b7e6c6a62?w=400'],
        ['Rasgulla', 'Indian', 45, 80, 'Soft cottage cheese balls in light sugar syrup', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'],
        ['Cupcake', 'Bakery', 60, 40, 'Vanilla cupcake with buttercream frosting', 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400'],
        ['Jalebi', 'Indian', 55, 60, 'Crispy sweet pretzel soaked in saffron syrup', 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400'],
        ['Laddu', 'Indian', 40, 90, 'Traditional Indian sweet made with gram flour', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400'],
        ['Kaju Katli', 'Indian', 120, 30, 'Diamond-shaped cashew fudge with silver leaf', 'https://images.unsplash.com/photo-1606312619070-d48b4cdf3989?w=400'],
        ['Chocolate Cake', 'Bakery', 150, 25, 'Moist chocolate cake with ganache', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'],
        ['Gummy Bears', 'Candy', 30, 200, 'Colorful fruit-flavored gummy candies', 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400'],
        ['Lollipop', 'Candy', 20, 150, 'Classic swirl lollipop in assorted flavors', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400']
      ];

      for (const sweet of sampleSweets) {
        await pool.query(
          'INSERT INTO sweets (name, category, price, quantity, description, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
          sweet
        );
      }
      
      console.log('✅ Sample sweets inserted');
    }

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

module.exports = {
  pool,
  initializeDatabase
};

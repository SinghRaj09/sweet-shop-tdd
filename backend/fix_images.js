require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'sweet_shop',
});

const correctImages = [
  { name: 'Kaju Katli', imageUrl: 'https://images.pexels.com/photos/18488310/pexels-photo-18488310.jpeg?w=400' },
  { name: 'Gulab Jamun', imageUrl: 'https://images.pexels.com/photos/15014919/pexels-photo-15014919.jpeg?w=400' },
  { name: 'Jalebi', imageUrl: 'https://images.pexels.com/photos/5831655/pexels-photo-5831655.jpeg?w=400' },
  { name: 'Laddu', imageUrl: 'https://images.pexels.com/photos/18488297/pexels-photo-18488297.jpeg?w=400' },
  { name: 'Rasgulla', imageUrl: 'https://images.pexels.com/photos/8788869/pexels-photo-8788869.jpeg?w=400' },
  { name: 'Chocolate Truffle', imageUrl: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?w=400' },
  { name: 'Chocolate Cake', imageUrl: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?w=400' },
  { name: 'Cupcake', imageUrl: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?w=400' },
];

async function fixImages() {
  try {
    console.log('Starting image fix...\n');

    for (const sweet of correctImages) {
      const result = await pool.query(
        'UPDATE sweets SET image_url = $1 WHERE name = $2 RETURNING id, name',
        [sweet.imageUrl, sweet.name]
      );

      if (result.rows.length > 0) {
        console.log(`Updated ${sweet.name}`);
      } else {
        console.log(`${sweet.name} not found in database`);
      }
    }

    console.log('\nAll images updated successfully!');
    console.log('Refresh your browser to see the changes.\n');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error fixing images:', error.message);
    await pool.end();
    process.exit(1);
  }
}

fixImages();
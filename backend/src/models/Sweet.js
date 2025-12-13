const { pool } = require('../database/db');

class Sweet {
  // Create a new sweet
  async create({ name, category, price, quantity, description, imageUrl }) {
    const query = `
      INSERT INTO sweets (name, category, price, quantity, description, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, category, price, quantity, description, image_url AS "imageUrl", created_at
    `;
    
    const result = await pool.query(query, [
      name, 
      category, 
      price, 
      quantity, 
      description, 
      imageUrl
    ]);
    return result.rows[0];
  }

  // Get all sweets
  async findAll() {
    const query = `
      SELECT 
        id, 
        name, 
        category, 
        price, 
        quantity, 
        description, 
        image_url AS "imageUrl",
        created_at,
        updated_at
      FROM sweets 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }

  // Find sweet by ID
  async findById(id) {
    const query = `
      SELECT 
        id, 
        name, 
        category, 
        price, 
        quantity, 
        description, 
        image_url AS "imageUrl",
        created_at,
        updated_at
      FROM sweets 
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Search sweets by name, category, or price range
  async search({ name, category, minPrice, maxPrice }) {
    let query = `
      SELECT 
        id, 
        name, 
        category, 
        price, 
        quantity, 
        description, 
        image_url AS "imageUrl",
        created_at,
        updated_at
      FROM sweets 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (name) {
      query += ` AND name ILIKE $${paramCount}`;
      params.push(`%${name}%`);
      paramCount++;
    }

    if (category) {
      query += ` AND category ILIKE $${paramCount}`;
      params.push(`%${category}%`);
      paramCount++;
    }

    if (minPrice !== undefined) {
      query += ` AND price >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }

    if (maxPrice !== undefined) {
      query += ` AND price <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  // Update sweet
  async update(id, { name, category, price, quantity, description, imageUrl }) {
    const query = `
      UPDATE sweets 
      SET 
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        price = COALESCE($3, price),
        quantity = COALESCE($4, quantity),
        description = COALESCE($5, description),
        image_url = COALESCE($6, image_url)
      WHERE id = $7
      RETURNING 
        id, 
        name, 
        category, 
        price, 
        quantity, 
        description, 
        image_url AS "imageUrl",
        updated_at
    `;
    
    const result = await pool.query(query, [
      name,
      category,
      price,
      quantity,
      description,
      imageUrl,
      id
    ]);
    return result.rows[0];
  }

  // Delete sweet
  async delete(id) {
    const query = 'DELETE FROM sweets WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Purchase sweet (decrease quantity)
  async purchase(sweetId, quantity, userId) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Get current sweet
      const sweetQuery = 'SELECT * FROM sweets WHERE id = $1 FOR UPDATE';
      const sweetResult = await client.query(sweetQuery, [sweetId]);
      const sweet = sweetResult.rows[0];

      if (!sweet) {
        throw new Error('Sweet not found');
      }

      if (sweet.quantity < quantity) {
        throw new Error('Insufficient stock');
      }

      // Update sweet quantity
      const updateQuery = `
        UPDATE sweets 
        SET quantity = quantity - $1 
        WHERE id = $2
        RETURNING 
          id, 
          name, 
          category, 
          price, 
          quantity, 
          description, 
          image_url AS "imageUrl"
      `;
      const updateResult = await client.query(updateQuery, [quantity, sweetId]);

      // Record purchase
      const totalPrice = sweet.price * quantity;
      const purchaseQuery = `
        INSERT INTO purchases (user_id, sweet_id, quantity, total_price)
        VALUES ($1, $2, $3, $4)
        RETURNING id, purchased_at
      `;
      await client.query(purchaseQuery, [userId, sweetId, quantity, totalPrice]);

      await client.query('COMMIT');
      return updateResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Restock sweet (increase quantity)
  async restock(id, quantity) {
    const query = `
      UPDATE sweets 
      SET quantity = quantity + $1 
      WHERE id = $2
      RETURNING 
        id, 
        name, 
        category, 
        price, 
        quantity, 
        description, 
        image_url AS "imageUrl"
    `;
    
    const result = await pool.query(query, [quantity, id]);
    return result.rows[0];
  }

  // Get categories
  async getCategories() {
    const query = 'SELECT DISTINCT category FROM sweets ORDER BY category';
    const result = await pool.query(query);
    return result.rows.map(row => row.category);
  }
}

module.exports = new Sweet();

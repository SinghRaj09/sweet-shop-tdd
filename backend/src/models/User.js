const { pool } = require('../database/db');

class User {
  // Create a new user
  async create({ username, email, password, role = 'user' }) {
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, created_at
    `;
    
    try {
      const result = await pool.query(query, [username, email, password, role]);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Find user by email
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Find user by ID
  async findById(id) {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Get all users (admin only)
  async findAll() {
    const query = 'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Update user
  async update(id, { username, email, role }) {
    const query = `
      UPDATE users 
      SET username = COALESCE($1, username),
          email = COALESCE($2, email),
          role = COALESCE($3, role)
      WHERE id = $4
      RETURNING id, username, email, role, updated_at
    `;
    
    const result = await pool.query(query, [username, email, role, id]);
    return result.rows[0];
  }

  // Delete user
  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new User();

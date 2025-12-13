const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  // Register a new user
  async register({ username, email, password }) {
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user with default role 'user'
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'user'
      });

      // Generate JWT token
      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      // Return user without password
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login({ email, password }) {
    try {
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      // Return user without password
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Generate JWT token
  generateToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Get user from token
  async getUserFromToken(token) {
    const decoded = this.verifyToken(token);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }
}

module.exports = new AuthService();

const AuthService = require('../services/AuthService');
const { validationResult } = require('express-validator');

class AuthController {
  // Register new user
  async register(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const { username, email, password } = req.body;

      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({ 
          message: 'Username, email, and password are required' 
        });
      }

      // Register user
      const result = await AuthService.register({ username, email, password });

      res.status(201).json(result);
    } catch (error) {
      console.error('Registration error:', error);

      if (error.message === 'Email already exists') {
        return res.status(409).json({ 
          message: 'Email already exists. Please login instead.' 
        });
      }

      res.status(500).json({ 
        message: error.message || 'Error registering user' 
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email and password are required' 
        });
      }

      // Login user
      const result = await AuthService.login({ email, password });

      res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);

      if (error.message === 'Invalid email or password') {
        return res.status(401).json({ 
          message: 'Invalid email or password' 
        });
      }

      res.status(500).json({ 
        message: error.message || 'Error logging in' 
      });
    }
  }

  // Get current user (protected route)
  async getCurrentUser(req, res) {
    try {
      // User is already attached to req by authenticate middleware
      res.status(200).json({
        user: req.user
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ 
        message: 'Error getting user information' 
      });
    }
  }

  // Logout (client-side will handle token removal)
  async logout(req, res) {
    try {
      // In a stateless JWT system, logout is handled client-side
      // by removing the token from storage
      res.status(200).json({ 
        message: 'Logged out successfully' 
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ 
        message: 'Error logging out' 
      });
    }
  }
}

module.exports = new AuthController();

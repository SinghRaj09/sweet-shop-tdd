const SweetService = require('../services/SweetService');
const { validationResult } = require('express-validator');

class SweetController {
  // Create new sweet (Admin only)
  async createSweet(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const sweet = await SweetService.createSweet(req.body);
      
      res.status(201).json(sweet);
    } catch (error) {
      console.error('Create sweet error:', error);
      res.status(500).json({ 
        message: error.message || 'Error creating sweet' 
      });
    }
  }

  // Get all sweets
  async getAllSweets(req, res) {
    try {
      const sweets = await SweetService.getAllSweets();
      res.status(200).json(sweets);
    } catch (error) {
      console.error('Get all sweets error:', error);
      res.status(500).json({ 
        message: 'Error fetching sweets' 
      });
    }
  }

  // Get sweet by ID
  async getSweetById(req, res) {
    try {
      const { id } = req.params;
      const sweet = await SweetService.getSweetById(id);
      
      res.status(200).json(sweet);
    } catch (error) {
      console.error('Get sweet by ID error:', error);
      
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: 'Error fetching sweet' 
      });
    }
  }

  // Search sweets
  async searchSweets(req, res) {
    try {
      const { name, category, minPrice, maxPrice } = req.query;
      
      const sweets = await SweetService.searchSweets({
        name,
        category,
        minPrice,
        maxPrice
      });
      
      res.status(200).json(sweets);
    } catch (error) {
      console.error('Search sweets error:', error);
      res.status(500).json({ 
        message: 'Error searching sweets' 
      });
    }
  }

  // Update sweet (Admin only)
  async updateSweet(req, res) {
    try {
      const { id } = req.params;
      
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const sweet = await SweetService.updateSweet(id, req.body);
      
      res.status(200).json(sweet);
    } catch (error) {
      console.error('Update sweet error:', error);
      
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: error.message || 'Error updating sweet' 
      });
    }
  }

  // Delete sweet (Admin only)
  async deleteSweet(req, res) {
    try {
      const { id } = req.params;
      const result = await SweetService.deleteSweet(id);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Delete sweet error:', error);
      
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: 'Error deleting sweet' 
      });
    }
  }

  // Purchase sweet
  async purchaseSweet(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const userId = req.user.id; // From authenticate middleware

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ 
          message: 'Quantity must be a positive number' 
        });
      }

      const sweet = await SweetService.purchaseSweet(id, quantity, userId);
      
      res.status(200).json({
        message: 'Purchase successful',
        sweet
      });
    } catch (error) {
      console.error('Purchase sweet error:', error);
      
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ message: error.message });
      }
      
      if (error.message === 'Insufficient stock') {
        return res.status(400).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: error.message || 'Error purchasing sweet' 
      });
    }
  }

  // Restock sweet (Admin only)
  async restockSweet(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ 
          message: 'Quantity must be a positive number' 
        });
      }

      const sweet = await SweetService.restockSweet(id, quantity);
      
      res.status(200).json({
        message: 'Restock successful',
        sweet
      });
    } catch (error) {
      console.error('Restock sweet error:', error);
      
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: error.message || 'Error restocking sweet' 
      });
    }
  }

  // Get all categories
  async getCategories(req, res) {
    try {
      const categories = await SweetService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ 
        message: 'Error fetching categories' 
      });
    }
  }
}

module.exports = new SweetController();

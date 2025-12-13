const Sweet = require('../models/Sweet');

class SweetService {
  // Create a new sweet
  async createSweet(sweetData) {
    try {
      const { name, category, price, quantity, description, imageUrl } = sweetData;

      // Validation
      if (!name || !category || price === undefined || quantity === undefined) {
        throw new Error('Name, category, price, and quantity are required');
      }

      if (price < 0) {
        throw new Error('Price must be a positive number');
      }

      if (quantity < 0) {
        throw new Error('Quantity must be a non-negative number');
      }

      const sweet = await Sweet.create({
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description: description || '',
        imageUrl: imageUrl || null
      });

      return sweet;
    } catch (error) {
      throw error;
    }
  }

  // Get all sweets
  async getAllSweets() {
    try {
      const sweets = await Sweet.findAll();
      return sweets;
    } catch (error) {
      throw error;
    }
  }

  // Get sweet by ID
  async getSweetById(id) {
    try {
      const sweet = await Sweet.findById(id);
      
      if (!sweet) {
        throw new Error('Sweet not found');
      }

      return sweet;
    } catch (error) {
      throw error;
    }
  }

  // Search sweets
  async searchSweets({ name, category, minPrice, maxPrice }) {
    try {
      const sweets = await Sweet.search({
        name,
        category,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
      });

      return sweets;
    } catch (error) {
      throw error;
    }
  }

  // Update sweet
  async updateSweet(id, sweetData) {
    try {
      // Check if sweet exists
      const existingSweet = await Sweet.findById(id);
      if (!existingSweet) {
        throw new Error('Sweet not found');
      }

      const { name, category, price, quantity, description, imageUrl } = sweetData;

      // Validation
      if (price !== undefined && price < 0) {
        throw new Error('Price must be a positive number');
      }

      if (quantity !== undefined && quantity < 0) {
        throw new Error('Quantity must be a non-negative number');
      }

      const updatedSweet = await Sweet.update(id, {
        name,
        category,
        price: price !== undefined ? parseFloat(price) : undefined,
        quantity: quantity !== undefined ? parseInt(quantity) : undefined,
        description,
        imageUrl
      });

      return updatedSweet;
    } catch (error) {
      throw error;
    }
  }

  // Delete sweet
  async deleteSweet(id) {
    try {
      const sweet = await Sweet.findById(id);
      if (!sweet) {
        throw new Error('Sweet not found');
      }

      await Sweet.delete(id);
      return { message: 'Sweet deleted successfully', id };
    } catch (error) {
      throw error;
    }
  }

  // Purchase sweet
  async purchaseSweet(id, quantity, userId) {
    try {
      if (!quantity || quantity <= 0) {
        throw new Error('Quantity must be a positive number');
      }

      const sweet = await Sweet.purchase(id, parseInt(quantity), userId);
      return sweet;
    } catch (error) {
      throw error;
    }
  }

  // Restock sweet
  async restockSweet(id, quantity) {
    try {
      const sweet = await Sweet.findById(id);
      if (!sweet) {
        throw new Error('Sweet not found');
      }

      if (!quantity || quantity <= 0) {
        throw new Error('Quantity must be a positive number');
      }

      const updatedSweet = await Sweet.restock(id, parseInt(quantity));
      return updatedSweet;
    } catch (error) {
      throw error;
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const categories = await Sweet.getCategories();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SweetService();

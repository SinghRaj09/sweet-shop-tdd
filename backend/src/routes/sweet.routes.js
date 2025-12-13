const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const SweetController = require('../controllers/SweetController');
const authenticate = require('../middleware/authenticate');
const authorizeAdmin = require('../middleware/authorizeAdmin');

// Validation rules
const createSweetValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
];

const updateSweetValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
];

// Public routes (anyone can view sweets)
router.get('/', SweetController.getAllSweets);
router.get('/search', SweetController.searchSweets);
router.get('/categories', SweetController.getCategories);
router.get('/:id', SweetController.getSweetById);

// Protected routes (authenticated users)
router.post('/:id/purchase', authenticate, SweetController.purchaseSweet);

// Admin only routes
router.post('/', authenticate, authorizeAdmin, createSweetValidation, SweetController.createSweet);
router.put('/:id', authenticate, authorizeAdmin, updateSweetValidation, SweetController.updateSweet);
router.delete('/:id', authenticate, authorizeAdmin, SweetController.deleteSweet);
router.post('/:id/restock', authenticate, authorizeAdmin, SweetController.restockSweet);

module.exports = router;

import React, { useState, useEffect } from 'react';
import { sweetAPI } from '../utils/api';
import './AdminSweetForm.css';

const AdminSweetForm = ({ sweet = null, onSuccess, onCancel }) => {
  const isEdit = !!sweet;
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    imageUrl: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categories = ['Chocolate', 'Candy', 'Bakery', 'Indian', 'Gummy', 'Hard Candy', 'Lollipop'];

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || '',
        category: sweet.category || '',
        price: sweet.price || '',
        quantity: sweet.quantity || '',
        description: sweet.description || '',
        imageUrl: sweet.imageUrl || ''
      });
    }
  }, [sweet]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.quantity && formData.quantity !== 0) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const sweetData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };

      if (isEdit) {
        await sweetAPI.update(sweet.id, sweetData);
      } else {
        await sweetAPI.create(sweetData);
      }

      onSuccess && onSuccess();
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await sweetAPI.delete(sweet.id);
      onSuccess && onSuccess();
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to delete sweet.'
      });
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleRestock = async () => {
    const quantity = prompt('Enter quantity to add:', '10');
    if (quantity === null) return;

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    setLoading(true);
    try {
      await sweetAPI.restock(sweet.id, parsedQuantity);
      onSuccess && onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to restock sweet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-sweet-form">
      <div className="form-header">
        <h2>{isEdit ? 'Edit Sweet' : 'Add New Sweet'}</h2>
        <button className="close-button" onClick={onCancel}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Sweet Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Chocolate Truffle"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 45.00"
              step="0.01"
              min="0"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Stock Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 50"
              min="0"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={errors.imageUrl ? 'error' : ''}
          />
          {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
          {formData.imageUrl && isValidUrl(formData.imageUrl) && (
            <div className="image-preview">
              <img src={formData.imageUrl} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the sweet..."
            rows="4"
          />
        </div>

        {errors.submit && (
          <div className="submit-error">
            <span className="error-icon">⚠️</span>
            {errors.submit}
          </div>
        )}

        <div className="form-actions">
          {isEdit && (
            <>
              <button
                type="button"
                className="restock-button"
                onClick={handleRestock}
                disabled={loading}
              >
                📦 Restock
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
              >
                🗑️ Delete
              </button>
            </>
          )}
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? '⏳ Saving...' : (isEdit ? '✓ Update' : '+ Add Sweet')}
          </button>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="delete-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{sweet.name}</strong>?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSweetForm;
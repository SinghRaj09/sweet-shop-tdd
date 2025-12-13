import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sweetAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import AdminSweetForm from '../components/AdminSweetForm';

const Dashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetAPI.getAll();
      setSweets(response.data);
      setError(null);
    } catch (error) {
      console.error('Error loading sweets:', error);
      setError('Failed to load sweets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sweet) => {
    setSelectedSweet(sweet);
    setShowAdminForm(true);
  };

  const handleSuccess = () => {
    setShowAdminForm(false);
    setSelectedSweet(null);
    loadSweets();
  };

  const handlePurchase = async (sweetId) => {
    try {
      await sweetAPI.purchase(sweetId, 1);
      loadSweets();
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase error:', error);
      alert(error.response?.data?.message || 'Failed to purchase sweet');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Filter sweets
  const filteredSweets = sweets.filter(sweet => {
    const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['All', ...new Set(sweets.map(sweet => sweet.category))];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e8f5f7 0%, #fef3e8 100%)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid rgba(158, 229, 213, 0.3)',
          borderTopColor: '#9ee5d5',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="logo">🧁 Sweet Shop</div>
        <input
          type="text"
          className="search-input"
          placeholder="Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="header-actions">
          <span style={{ marginRight: '16px', color: '#2c3e50' }}>
            Welcome, <strong>{user?.username}</strong>!
          </span>
          {isAdmin() && (
            <span style={{
              background: 'linear-gradient(135deg, #f4c96b 0%, #ffa94d 100%)',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '600',
              marginRight: '12px'
            }}>
              ADMIN
            </span>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1>Your Sweet Destination</h1>
        <p>Fresh • Delicious • Handcrafted</p>
      </div>

      {/* Main Content */}
      <div className="shop-content">
        {/* Filter Panel */}
        <aside className="filter-panel">
          <h3>Filters</h3>
          <label>Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {isAdmin() && (
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => {
                  setSelectedSweet(null);
                  setShowAdminForm(true);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #50c878 0%, #3da661 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                + Add New Sweet
              </button>
            </div>
          )}
        </aside>

        {/* Sweet Grid */}
        <main style={{ flex: 1 }}>
          {error && (
            <div style={{
              background: 'rgba(255, 107, 107, 0.1)',
              border: '2px solid #ff6b6b',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              color: '#d63031',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {showAdminForm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
              overflowY: 'auto'
            }}>
              <div style={{ maxWidth: '700px', width: '100%' }}>
                <AdminSweetForm
                  sweet={selectedSweet}
                  onSuccess={handleSuccess}
                  onCancel={() => {
                    setShowAdminForm(false);
                    setSelectedSweet(null);
                  }}
                />
              </div>
            </div>
          )}

          {filteredSweets.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#7f8c9a'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
              <h3>No sweets found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="sweet-grid">
              {filteredSweets.map(sweet => (
                <div key={sweet.id} className="sweet-card">
                  {sweet.quantity === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: '#ff6b6b',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: '600',
                      zIndex: 10
                    }}>
                      OUT OF STOCK
                    </div>
                  )}
                  
                  <img
                    src={sweet.imageUrl || 'https://via.placeholder.com/300x200?text=Sweet'}
                    alt={sweet.name}
                    className="sweet-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Sweet';
                    }}
                  />
                  
                  <div className="sweet-card-content">
                    <span className="category-badge">{sweet.category}</span>
                    <h4>{sweet.name}</h4>
                    {sweet.description && (
                      <p style={{ fontSize: '14px', color: '#7f8c9a', marginBottom: '12px' }}>
                        {sweet.description.substring(0, 60)}
                        {sweet.description.length > 60 ? '...' : ''}
                      </p>
                    )}
                    <p className="price">₹ {sweet.price}</p>
                    <p className="stock-info">
                      Stock: <strong>{sweet.quantity}</strong>
                    </p>
                    
                    <button
                      disabled={sweet.quantity === 0}
                      onClick={() => handlePurchase(sweet.id)}
                    >
                      {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                    </button>

                    {isAdmin() && (
                      <button
                        onClick={() => handleEdit(sweet)}
                        style={{
                          marginTop: '8px',
                          background: 'linear-gradient(135deg, #9ee5d5 0%, #7ac9b8 100%)'
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
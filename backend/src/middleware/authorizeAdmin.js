// Middleware to check if user is admin
const authorizeAdmin = (req, res, next) => {
  try {
    // Check if user is authenticated (this middleware should come after authenticate middleware)
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Access denied. User not authenticated.' 
      });
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(500).json({ 
      message: 'Internal server error during authorization.' 
    });
  }
};

module.exports = authorizeAdmin;

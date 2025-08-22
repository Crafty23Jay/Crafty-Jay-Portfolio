const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// Example protected route
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to your protected profile!', user: req.user });
});

module.exports = router;

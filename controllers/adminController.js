const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const adminController = {
  // Register admin
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if admin already exists
      const existingEmail = await Admin.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const existingUsername = await Admin.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }

      // Create admin
      const admin = await Admin.create({ username, email, password });
      
      // Generate token
      const token = jwt.sign(
        { id: admin.id, username: admin.username, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Admin registered successfully',
        admin: { id: admin.id, username: admin.username, email: admin.email },
        token
      });
    } catch (error) {
      console.error('Error registering admin:', error);
      res.status(500).json({ error: 'Failed to register admin' });
    }
  },

  // Login admin
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find admin
      const admin = await Admin.findByEmail(email);
      if (!admin) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isValidPassword = await Admin.verifyPassword(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate token
      const token = jwt.sign(
        { id: admin.id, username: admin.username, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        admin: { id: admin.id, username: admin.username, email: admin.email },
        token
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  },

  // Get current admin
  getCurrentAdmin: async (req, res) => {
    try {
      res.json({
        admin: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email
        }
      });
    } catch (error) {
      console.error('Error fetching admin:', error);
      res.status(500).json({ error: 'Failed to fetch admin data' });
    }
  }
};

module.exports = adminController;

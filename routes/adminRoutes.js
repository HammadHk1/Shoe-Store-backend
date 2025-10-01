const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/me', authMiddleware, adminController.getCurrentAdmin);

module.exports = router;
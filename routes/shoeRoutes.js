const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/shoes', shoeController.getAllShoes);
router.get('/shoes/:id', shoeController.getShoeById);

// Protected routes (require authentication)
router.post('/shoes', authMiddleware, upload.single('image'), shoeController.createShoe);
router.put('/shoes/:id', authMiddleware, upload.single('image'), shoeController.updateShoe);
router.delete('/shoes/:id', authMiddleware, shoeController.deleteShoe);

module.exports = router;
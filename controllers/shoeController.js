const Shoe = require('../models/shoeModel');

const shoeController = {
  // Create shoe
  createShoe: async (req, res) => {
    try {
      const shoeData = {
        ...req.body,
        image: req.file ? req.file.filename : null
      };
      const shoe = await Shoe.create(shoeData);
      res.status(201).json(shoe);
    } catch (error) {
      console.error('Error creating shoe:', error);
      res.status(500).json({ error: 'Failed to create shoe' });
    }
  },

  // Get all shoes
  getAllShoes: async (req, res) => {
    try {
      const shoes = await Shoe.getAll();
      res.json(shoes);
    } catch (error) {
      console.error('Error fetching shoes:', error);
      res.status(500).json({ error: 'Failed to fetch shoes' });
    }
  },

  // Get shoe by ID
  getShoeById: async (req, res) => {
    try {
      const shoe = await Shoe.getById(req.params.id);
      if (!shoe) {
        return res.status(404).json({ error: 'Shoe not found' });
      }
      res.json(shoe);
    } catch (error) {
      console.error('Error fetching shoe:', error);
      res.status(500).json({ error: 'Failed to fetch shoe' });
    }
  },

  // Update shoe
  updateShoe: async (req, res) => {
    try {
      const shoeData = {
        ...req.body,
        image: req.file ? req.file.filename : req.body.existingImage
      };
      const shoe = await Shoe.update(req.params.id, shoeData);
      if (!shoe) {
        return res.status(404).json({ error: 'Shoe not found' });
      }
      res.json(shoe);
    } catch (error) {
      console.error('Error updating shoe:', error);
      res.status(500).json({ error: 'Failed to update shoe' });
    }
  },

  // Delete shoe
  deleteShoe: async (req, res) => {
    try {
      const shoe = await Shoe.delete(req.params.id);
      if (!shoe) {
        return res.status(404).json({ error: 'Shoe not found' });
      }
      res.json({ message: 'Shoe deleted successfully', shoe });
    } catch (error) {
      console.error('Error deleting shoe:', error);
      res.status(500).json({ error: 'Failed to delete shoe' });
    }
  }
};

module.exports = shoeController;
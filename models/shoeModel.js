// ========================================
const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

const Shoe = {
  // Create a new shoe
  create: async (shoeData) => {
    const { name, brand, size, color, price, stock, image } = shoeData;
    const query = `
      INSERT INTO shoes (name, brand, size, color, price, stock, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [name, brand, size, color, price, stock, image || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all shoes
  getAll: async () => {
    const query = 'SELECT * FROM shoes ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  // Get shoe by ID
  getById: async (id) => {
    const query = 'SELECT * FROM shoes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update shoe
  update: async (id, shoeData) => {
    const { name, brand, size, color, price, stock, image } = shoeData;
    
    // Get old shoe data to delete old image if new one is uploaded
    const oldShoe = await Shoe.getById(id);
    
    const query = `
      UPDATE shoes
      SET name = $1, brand = $2, size = $3, color = $4, price = $5, stock = $6, image = $7, updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `;
    const values = [name, brand, size, color, price, stock, image || oldShoe.image, id];
    const result = await pool.query(query, values);
    
    // Delete old image if new one was uploaded and old one exists
    if (image && oldShoe.image && image !== oldShoe.image) {
      const oldImagePath = path.join(__dirname, '../uploads', oldShoe.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    return result.rows[0];
  },

  // Delete shoe
  delete: async (id) => {
    const shoe = await Shoe.getById(id);
    const query = 'DELETE FROM shoes WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    // Delete associated image file
    if (shoe && shoe.image) {
      const imagePath = path.join(__dirname, '../uploads', shoe.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    return result.rows[0];
  }
};

module.exports = Shoe;
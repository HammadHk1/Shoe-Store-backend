const pool = require('../config/database');
const bcrypt = require('bcrypt');

const Admin = {
  // Create admin
  create: async (adminData) => {
    const { username, email, password } = adminData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO admins (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Find admin by email
  findByEmail: async (email) => {
    const query = 'SELECT * FROM admins WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  // Find admin by username
  findByUsername: async (username) => {
    const query = 'SELECT * FROM admins WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  // Verify password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = Admin;
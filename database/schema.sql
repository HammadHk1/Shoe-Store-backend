-- Create database
CREATE DATABASE shoe_store;

-- Connect to database
\c shoe_store

-- Create admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create shoes table
CREATE TABLE shoes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  size VARCHAR(20) NOT NULL,
  color VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on brand for faster queries
CREATE INDEX idx_shoes_brand ON shoes(brand);

-- Insert sample admin (password: admin123)
INSERT INTO admins (username, email, password) VALUES
('admin', 'admin@shoestore.com', '$2b$10$YourHashedPasswordHere');

-- Insert sample data
INSERT INTO shoes (name, brand, size, color, price, stock, image) VALUES
('Air Max 90', 'Nike', '10', 'White/Black', 120.00, 15, null),
('Ultra Boost', 'Adidas', '9', 'Core Black', 180.00, 8, null),
('Classic Leather', 'Reebok', '11', 'White', 75.00, 20, null),
('Chuck Taylor', 'Converse', '8', 'Red', 55.00, 30, null);
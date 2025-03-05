-- Active: 1741173817772@@127.0.0.1@3306@vibees_db
-- Create the database
CREATE DATABASE IF NOT EXISTS vibees;

-- Use the database
USE vibees;

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(255),
    points INT
);

-- Insert data into the products table
INSERT INTO products (name, description, price, image_url, category, points) VALUES
('Bananas, Bunch', 'about $2.00', 2.00, 'https://storage.googleapis.com/a1aa/image/VekPPyps7xxLfUn2evGafvaHHPXFlpuwLE05YMOVXqI.jpg', 'Fruits and Vegetables', NULL),
('Large Grade A Eggs', '$4.25', 4.25, 'https://storage.googleapis.com/a1aa/image/yTbfk1ttPIH6MSh6YhWmE8FVDZeiAwoLC6iU2YcQR2E.jpg', 'Dairy & Eggs', NULL),
('Gourmet West Coast Dark Roast Fine Grind Coffee', '$4.25', 4.25, 'https://storage.googleapis.com/a1aa/image/9gaSL-91Lk2fvH21FbGr3QVzaz8bOon8ovU2pweJqm8.jpg', 'Beverages', 2000),
('Extra Large Green Seedless Grapes', 'about $8.98', 8.98, 'https://storage.googleapis.com/a1aa/image/IKLn1DvnzkSRDajutVUdrTicWHnbus5lub7FUKVF3Uk.jpg', 'Fruits and Vegetables', NULL),
('White Baguette', '$4.00', 4.00, 'https://storage.googleapis.com/a1aa/image/rtQz2xXW57VKgq4hOswRmxNAr2EmQT0Q6Cu2q4UbJiU.jpg', 'Bakery', NULL),
('Boneless Skinless Chicken Breasts', '$16.00', 16.00, 'https://storage.googleapis.com/a1aa/image/XAHzpkAeCcoOoY1U1p6l9o-DzxL6w26NTj0ApxE2jj4.jpg', 'Meat', NULL);
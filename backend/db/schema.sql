-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ecoride;

-- Usar la base de datos
USE ecoride;

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  imageUrl VARCHAR(255),
  wheelType VARCHAR(50) DEFAULT 'standard',
  color VARCHAR(50) DEFAULT '#000000',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo (opcional)
INSERT INTO products (name, description, price, imageUrl, wheelType, color)
VALUES
  ('Patineta EcoRide 1', 'Patineta eléctrica básica para principiantes', 299.99, 'assets/product1.webp', 'standard', '#000000');

INSERT INTO products (name, description, price, imageUrl, wheelType, color)
VALUES
  ('Patineta EcoRide 2', 'Patineta eléctrica para uso diario con mayor autonomía', 399.99, 'assets/product2.png', 'premium', '#FF5733');

INSERT INTO products (name, description, price, imageUrl, wheelType, color)
VALUES
  ('Patineta EcoRide 3', 'Patineta eléctrica de alto rendimiento para entusiastas', 499.99, 'assets/product3.webp', 'racing', '#3366FF');

INSERT INTO products (name, description, price, imageUrl, wheelType, color)
VALUES
  ('EcoRide Mini', 'Patineta eléctrica compacta y ligera', 249.99, 'assets/product1.webp', 'standard', '#33FF57');

INSERT INTO products (name, description, price, imageUrl, wheelType, color)
VALUES
  ('EcoRide Explorer', 'Patineta eléctrica todoterreno para aventuras', 599.99, 'assets/product2.png', 'premium', '#FFFF33'); 
const { pool } = require('../config/db');

class ProductModel {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const [rows] = await pool.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Crear un nuevo producto
  async createProduct(product) {
    try {
      const { name, description, price, imageUrl, wheelType, color } = product;
      const [result] = await pool.query(
        'INSERT INTO products (name, description, price, imageUrl, wheelType, color) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, imageUrl, wheelType, color]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un producto
  async updateProduct(id, product) {
    try {
      const { name, description, price, imageUrl, wheelType, color } = product;
      const [result] = await pool.query(
        'UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ?, wheelType = ?, color = ? WHERE id = ?',
        [name, description, price, imageUrl, wheelType, color, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductModel(); 
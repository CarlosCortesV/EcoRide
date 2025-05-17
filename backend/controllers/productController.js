const productModel = require('../models/productModel');

// Obtener todos los productos
async function getAllProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
}

// Obtener un producto por ID
async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await productModel.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
}

// Crear un nuevo producto
async function createProduct(req, res) {
  try {
    const product = req.body;
    
    // Validación básica
    if (!product.name || !product.price) {
      return res.status(400).json({ message: 'El nombre y precio son obligatorios' });
    }
    
    const productId = await productModel.createProduct(product);
    res.status(201).json({ id: productId, ...product });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const product = req.body;
    
    // Validación básica
    if (!product.name || !product.price) {
      return res.status(400).json({ message: 'El nombre y precio son obligatorios' });
    }
    
    const updated = await productModel.updateProduct(id, product);
    
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json({ id, ...product });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const deleted = await productModel.deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}; 
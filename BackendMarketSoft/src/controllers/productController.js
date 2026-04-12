const { Product, Provider } = require('../models');

const productController = {
  // GET /api/products
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [{
          association: 'provider',
          as: 'provider',
          attributes: ['id', 'name', 'email', 'city']
        }],
        order: [['name', 'ASC']]
      });
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: error.message
      });
    }
  },

  // GET /api/products/:id
  getById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{
          association: 'provider',
          as: 'provider',
          attributes: ['id', 'name', 'email', 'city']
        }]
      });
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching product',
        error: error.message
      });
    }
  },

  // POST /api/products
  create: async (req, res) => {
    try {
      const { name, description, price, stock, providerId } = req.body;

      // Validate price > 0
      if (!price || price <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be greater than 0'
        });
      }

      // Validate stock >= 0
      if (stock === undefined || stock === null || stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stock cannot be negative'
        });
      }

      const product = await Product.create({
        name,
        description,
        price,
        stock: stock || 0,
        providerId
      });

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating product',
        error: error.message
      });
    }
  },

  // PUT /api/products/:id
  update: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const { name, description, price, stock, providerId } = req.body;

      // Validate price > 0
      if (price !== undefined && price <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be greater than 0'
        });
      }

      // Validate stock >= 0
      if (stock !== undefined && stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stock cannot be negative'
        });
      }

      await product.update({ name, description, price, stock, providerId });

      res.json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating product',
        error: error.message
      });
    }
  },

  // DELETE /api/products/:id
  delete: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      await product.destroy();

      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: error.message
      });
    }
  }
};

module.exports = productController;

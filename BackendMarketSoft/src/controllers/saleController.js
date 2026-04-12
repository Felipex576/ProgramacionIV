const { Sale, SaleDetail, Product, User } = require('../models');
const { sequelize } = require('../config/database');

const saleController = {
  // GET /api/sales
  getAll: async (req, res) => {
    try {
      const sales = await Sale.findAll({
        include: [{
          association: 'user',
          as: 'user',
          attributes: ['id', 'name', 'email']
        }],
        order: [['date', 'DESC']]
      });
      res.json({
        success: true,
        count: sales.length,
        data: sales
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching sales',
        error: error.message
      });
    }
  },

  // GET /api/sales/:id
  getById: async (req, res) => {
    try {
      const sale = await Sale.findByPk(req.params.id, {
        include: [
          {
            association: 'user',
            as: 'user',
            attributes: ['id', 'name', 'email']
          },
          {
            association: 'details',
            as: 'details',
            include: [{
              association: 'product',
              as: 'product',
              attributes: ['id', 'name']
            }]
          }
        ]
      });
      
      if (!sale) {
        return res.status(404).json({
          success: false,
          message: 'Sale not found'
        });
      }

      res.json({
        success: true,
        data: sale
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching sale',
        error: error.message
      });
    }
  },

  // POST /api/sales
  create: async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
      const { userId, details } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      if (!details || !Array.isArray(details) || details.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Sale must have at least one detail'
        });
      }

      // Create sale
      const sale = await Sale.create({
        userId,
        total: 0.00
      }, { transaction });

      let total = 0;

      // Create sale details and calculate total
      for (const detail of details) {
        const { productId, quantity } = detail;

        if (!productId || !quantity || quantity < 1) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: 'Invalid detail: productId and quantity (min 1) are required'
          });
        }

        // Get product price
        const product = await Product.findByPk(productId, { transaction });
        if (!product) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: `Product with ID ${productId} not found`
          });
        }

        // Check stock availability
        if (product.stock < quantity) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}`
          });
        }

        const price = product.price;
        const subtotal = price * quantity;
        total += subtotal;

        // Create sale detail
        await SaleDetail.create({
          saleId: sale.id,
          productId,
          quantity,
          price
        }, { transaction });

        // Update product stock
        await product.decrement('stock', { by: quantity, transaction });
      }

      // Update sale total
      await sale.update({ total }, { transaction });

      await transaction.commit();

      // Fetch complete sale with details
      const completeSale = await Sale.findByPk(sale.id, {
        include: [
          {
            association: 'user',
            as: 'user',
            attributes: ['id', 'name', 'email']
          },
          {
            association: 'details',
            as: 'details',
            include: [{
              association: 'product',
              as: 'product',
              attributes: ['id', 'name']
            }]
          }
        ]
      });

      res.status(201).json({
        success: true,
        message: 'Sale created successfully',
        data: completeSale
      });
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({
        success: false,
        message: 'Error creating sale',
        error: error.message
      });
    }
  },

  // PUT /api/sales/:id
  update: async (req, res) => {
    try {
      const sale = await Sale.findByPk(req.params.id);
      
      if (!sale) {
        return res.status(404).json({
          success: false,
          message: 'Sale not found'
        });
      }

      // Total is auto-calculated, so we don't allow manual updates
      res.status(400).json({
        success: false,
        message: 'Sales cannot be updated manually. Total is auto-calculated from details.'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating sale',
        error: error.message
      });
    }
  },

  // DELETE /api/sales/:id
  delete: async (req, res) => {
    try {
      const sale = await Sale.findByPk(req.params.id);
      
      if (!sale) {
        return res.status(404).json({
          success: false,
          message: 'Sale not found'
        });
      }

      await sale.destroy();

      res.json({
        success: true,
        message: 'Sale deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting sale',
        error: error.message
      });
    }
  }
};

module.exports = saleController;

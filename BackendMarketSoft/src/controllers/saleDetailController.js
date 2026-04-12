const { SaleDetail, Sale, Product } = require('../models');

const saleDetailController = {
  // GET /api/sale-details
  getAll: async (req, res) => {
    try {
      const details = await SaleDetail.findAll({
        include: [
          {
            association: 'sale',
            as: 'sale',
            attributes: ['id', 'date', 'total']
          },
          {
            association: 'product',
            as: 'product',
            attributes: ['id', 'name']
          }
        ],
        order: [['id', 'ASC']]
      });
      res.json({
        success: true,
        count: details.length,
        data: details
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching sale details',
        error: error.message
      });
    }
  },

  // GET /api/sale-details/:id
  getById: async (req, res) => {
    try {
      const detail = await SaleDetail.findByPk(req.params.id, {
        include: [
          {
            association: 'sale',
            as: 'sale',
            attributes: ['id', 'date', 'total']
          },
          {
            association: 'product',
            as: 'product',
            attributes: ['id', 'name', 'price']
          }
        ]
      });
      
      if (!detail) {
        return res.status(404).json({
          success: false,
          message: 'Sale detail not found'
        });
      }

      res.json({
        success: true,
        data: detail
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching sale detail',
        error: error.message
      });
    }
  },

  // POST /api/sale-details
  create: async (req, res) => {
    try {
      const { saleId, productId, quantity, price } = req.body;

      if (!saleId || !productId || !quantity || !price) {
        return res.status(400).json({
          success: false,
          message: 'saleId, productId, quantity, and price are required'
        });
      }

      if (quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be at least 1'
        });
      }

      const detail = await SaleDetail.create({
        saleId,
        productId,
        quantity,
        price
      });

      res.status(201).json({
        success: true,
        message: 'Sale detail created successfully',
        data: detail
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating sale detail',
        error: error.message
      });
    }
  },

  // PUT /api/sale-details/:id
  update: async (req, res) => {
    try {
      const detail = await SaleDetail.findByPk(req.params.id);
      
      if (!detail) {
        return res.status(404).json({
          success: false,
          message: 'Sale detail not found'
        });
      }

      const { saleId, productId, quantity, price } = req.body;

      if (quantity !== undefined && quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be at least 1'
        });
      }

      await detail.update({ saleId, productId, quantity, price });

      res.json({
        success: true,
        message: 'Sale detail updated successfully',
        data: detail
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating sale detail',
        error: error.message
      });
    }
  },

  // DELETE /api/sale-details/:id
  delete: async (req, res) => {
    try {
      const detail = await SaleDetail.findByPk(req.params.id);
      
      if (!detail) {
        return res.status(404).json({
          success: false,
          message: 'Sale detail not found'
        });
      }

      await detail.destroy();

      res.json({
        success: true,
        message: 'Sale detail deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting sale detail',
        error: error.message
      });
    }
  }
};

module.exports = saleDetailController;

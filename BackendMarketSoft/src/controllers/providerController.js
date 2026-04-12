const { Provider } = require('../models');

const providerController = {
  // GET /api/providers
  getAll: async (req, res) => {
    try {
      const providers = await Provider.findAll({
        order: [['name', 'ASC']]
      });
      res.json({
        success: true,
        count: providers.length,
        data: providers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching providers',
        error: error.message
      });
    }
  },

  // GET /api/providers/:id
  getById: async (req, res) => {
    try {
      const provider = await Provider.findByPk(req.params.id, {
        include: [{
          association: 'products',
          as: 'products'
        }]
      });
      
      if (!provider) {
        return res.status(404).json({
          success: false,
          message: 'Provider not found'
        });
      }

      res.json({
        success: true,
        data: provider
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching provider',
        error: error.message
      });
    }
  },

  // POST /api/providers
  create: async (req, res) => {
    try {
      const { name, phone, email, city } = req.body;

      const provider = await Provider.create({
        name,
        phone,
        email,
        city
      });

      res.status(201).json({
        success: true,
        message: 'Provider created successfully',
        data: provider
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating provider',
        error: error.message
      });
    }
  },

  // PUT /api/providers/:id
  update: async (req, res) => {
    try {
      const provider = await Provider.findByPk(req.params.id);
      
      if (!provider) {
        return res.status(404).json({
          success: false,
          message: 'Provider not found'
        });
      }

      const { name, phone, email, city } = req.body;
      await provider.update({ name, phone, email, city });

      res.json({
        success: true,
        message: 'Provider updated successfully',
        data: provider
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating provider',
        error: error.message
      });
    }
  },

  // DELETE /api/providers/:id
  delete: async (req, res) => {
    try {
      const provider = await Provider.findByPk(req.params.id);
      
      if (!provider) {
        return res.status(404).json({
          success: false,
          message: 'Provider not found'
        });
      }

      await provider.destroy();

      res.json({
        success: true,
        message: 'Provider deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting provider',
        error: error.message
      });
    }
  }
};

module.exports = providerController;

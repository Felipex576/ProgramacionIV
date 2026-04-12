const { User } = require('../models');
const { Op } = require('sequelize');

const userController = {
  // GET /api/users
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: [] },
        order: [['name', 'ASC']]
      });
      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message
      });
    }
  },

  // GET /api/users/:id
  getById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{
          association: 'sales',
          as: 'sales'
        }]
      });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: error.message
      });
    }
  },

  // POST /api/users
  create: async (req, res) => {
    try {
      const { name, email, role } = req.body;

      // Validate unique email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already registered'
        });
      }

      const user = await User.create({
        name,
        email,
        role: role || 'cashier'
      });

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating user',
        error: error.message
      });
    }
  },

  // PUT /api/users/:id
  update: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const { name, email, role } = req.body;

      // Validate unique email (exclude current user)
      if (email && email !== user.email) {
        const existingUser = await User.findOne({
          where: {
            email,
            id: { [Op.ne]: user.id }
          }
        });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Email is already registered'
          });
        }
      }

      await user.update({ name, email, role });

      res.json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating user',
        error: error.message
      });
    }
  },

  // DELETE /api/users/:id
  delete: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await user.destroy();

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error.message
      });
    }
  }
};

module.exports = userController;

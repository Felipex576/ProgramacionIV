const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'providers',
  timestamps: true
});

module.exports = Provider;

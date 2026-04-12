const Provider = require('./Provider');
const Product = require('./Product');
const User = require('./User');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');

// Provider → Products (One-to-Many)
Provider.hasMany(Product, { foreignKey: 'providerId', as: 'products' });
Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });

// User → Sales (One-to-Many)
User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Sale → SaleDetails (One-to-Many)
Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'details' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' });

// Product → SaleDetails (One-to-Many)
Product.hasMany(SaleDetail, { foreignKey: 'productId', as: 'saleDetails' });
SaleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  Provider,
  Product,
  User,
  Sale,
  SaleDetail
};

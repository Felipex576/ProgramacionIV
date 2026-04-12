const { Provider, Product, User, Sale, SaleDetail } = require('./models');

/**
 * Seed the database with sample data.
 * Only runs when the database is empty to avoid duplicates.
 */
const seedDatabase = async () => {
  try {
    // Check if data already exists
    const providerCount = await Provider.count();
    if (providerCount > 0) {
      console.log('⏭️  Database already has data, skipping seed.');
      return;
    }

    console.log('🌱 Seeding database with sample data...');

    // ---- Providers ----
    const providers = await Provider.bulkCreate([
      {
        name: 'Distribuidora ABC',
        phone: '+57 300 123 4567',
        email: 'contacto@abc.com',
        city: 'Bogotá'
      },
      {
        name: 'Alimentos del Valle S.A.',
        phone: '+57 310 987 6543',
        email: 'ventas@valle.com',
        city: 'Cali'
      },
      {
        name: 'Lácteos Colombianos',
        phone: '+57 320 456 7890',
        email: 'info@lacteoscol.com',
        city: 'Medellín'
      }
    ]);
    console.log(`  ✅ ${providers.length} providers created`);

    // ---- Products ----
    const products = await Product.bulkCreate([
      {
        name: 'Arroz Diana 1kg',
        description: 'Arroz blanco de primera calidad',
        price: 4500.00,
        stock: 150,
        providerId: providers[0].id
      },
      {
        name: 'Aceite Girasol 1L',
        description: 'Aceite de girasol premium',
        price: 12000.00,
        stock: 80,
        providerId: providers[0].id
      },
      {
        name: 'Leche Alquería 1L',
        description: 'Leche entera pasteurizada',
        price: 3200.00,
        stock: 200,
        providerId: providers[2].id
      },
      {
        name: 'Pan Blanco Bimbo',
        description: 'Pan de molde blanco 500g',
        price: 5500.00,
        stock: 60,
        providerId: providers[1].id
      },
      {
        name: 'Huevos x30',
        description: 'Huevos frescos de granja',
        price: 15000.00,
        stock: 45,
        providerId: providers[1].id
      },
      {
        name: 'Coca-Cola 1.5L',
        description: 'Bebida gaseosa',
        price: 6500.00,
        stock: 100,
        providerId: providers[0].id
      },
      {
        name: 'Detergente Ariel 1kg',
        description: 'Detergente en polvo',
        price: 18000.00,
        stock: 35,
        providerId: providers[2].id
      },
      {
        name: 'Papel Higiénico x4',
        description: 'Pack 4 rollos',
        price: 8500.00,
        stock: 120,
        providerId: providers[1].id
      }
    ]);
    console.log(`  ✅ ${products.length} products created`);

    // ---- Users ----
    const users = await User.bulkCreate([
      {
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@marketsoft.com',
        role: 'admin'
      },
      {
        name: 'María López',
        email: 'maria.lopez@marketsoft.com',
        role: 'cashier'
      },
      {
        name: 'Juan Pérez',
        email: 'juan.perez@marketsoft.com',
        role: 'cashier'
      }
    ]);
    console.log(`  ✅ ${users.length} users created`);

    // ---- Sales ----
    const sales = await Sale.bulkCreate([
      {
        userId: users[1].id,
        date: new Date('2026-04-05T10:30:00'),
        total: 24100.00
      },
      {
        userId: users[2].id,
        date: new Date('2026-04-05T11:15:00'),
        total: 54500.00
      },
      {
        userId: users[1].id,
        date: new Date('2026-04-06T09:00:00'),
        total: 32500.00
      }
    ]);
    console.log(`  ✅ ${sales.length} sales created`);

    // ---- Sale Details ----
    const saleDetails = await SaleDetail.bulkCreate([
      // Sale #1
      { saleId: sales[0].id, productId: products[0].id, quantity: 2, price: 4500.00 },
      { saleId: sales[0].id, productId: products[2].id, quantity: 3, price: 3200.00 },
      { saleId: sales[0].id, productId: products[3].id, quantity: 1, price: 5500.00 },
      // Sale #2
      { saleId: sales[1].id, productId: products[4].id, quantity: 2, price: 15000.00 },
      { saleId: sales[1].id, productId: products[5].id, quantity: 1, price: 6500.00 },
      { saleId: sales[1].id, productId: products[6].id, quantity: 1, price: 18000.00 },
      // Sale #3
      { saleId: sales[2].id, productId: products[1].id, quantity: 2, price: 12000.00 },
      { saleId: sales[2].id, productId: products[7].id, quantity: 1, price: 8500.00 }
    ]);
    console.log(`  ✅ ${saleDetails.length} sale details created`);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

module.exports = seedDatabase;

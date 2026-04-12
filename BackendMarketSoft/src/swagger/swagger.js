const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MarketSoft API',
    version: '1.0.0',
    description: 'API REST para sistema de supermercado - MarketSoft',
    contact: {
      name: 'MarketSoft Team'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Providers',
      description: 'Proveedor management endpoints'
    },
    {
      name: 'Products',
      description: 'Producto management endpoints'
    },
    {
      name: 'Users',
      description: 'Usuario management endpoints'
    },
    {
      name: 'Sales',
      description: 'Venta management endpoints'
    },
    {
      name: 'SaleDetails',
      description: 'Detalle de venta management endpoints'
    }
  ],
  components: {
    schemas: {
      Provider: {
        type: 'object',
        required: ['name'],
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          name: {
            type: 'string',
            maxLength: 100
          },
          phone: {
            type: 'string',
            maxLength: 20
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 100
          },
          city: {
            type: 'string',
            maxLength: 100
          }
        }
      },
      Product: {
        type: 'object',
        required: ['name', 'price', 'providerId'],
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          name: {
            type: 'string',
            maxLength: 100
          },
          description: {
            type: 'string'
          },
          price: {
            type: 'number',
            minimum: 0.01
          },
          stock: {
            type: 'integer',
            minimum: 0,
            default: 0
          },
          providerId: {
            type: 'integer'
          }
        }
      },
      User: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          name: {
            type: 'string',
            maxLength: 100
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 100
          },
          role: {
            type: 'string',
            maxLength: 50,
            default: 'cashier'
          }
        }
      },
      Sale: {
        type: 'object',
        required: ['userId', 'details'],
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          userId: {
            type: 'integer'
          },
          date: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          },
          total: {
            type: 'number',
            readOnly: true,
            description: 'Auto-calculated from sale details'
          }
        }
      },
      SaleDetail: {
        type: 'object',
        required: ['saleId', 'productId', 'quantity', 'price'],
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          saleId: {
            type: 'integer'
          },
          productId: {
            type: 'integer'
          },
          quantity: {
            type: 'integer',
            minimum: 1
          },
          price: {
            type: 'number'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

# MarketSoft - Supermarket Management System Backend

## 📋 Descripción
API REST desarrollada en Node.js/Express para la gestión integral de un supermercado. Permite administrar productos, proveedores, usuarios y ventas mediante operaciones CRUD completas.

## 👥 Equipo de Desarrollo

| Nombre                    | Responsabilidades                                                              |
|---------------------------|--------------------------------------------------------------------------------|
| Luis Felipe Clavijo Acuña | Diseño de arquitectura, modelos Sequelize, controladores, rutas, documentación |

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **ORM:** Sequelize v6
- **Base de Datos:** PostgreSQL
- **Documentación:** Swagger (OpenAPI 3.0)
- **Arquitectura:** MVC (Model-View-Controller)

## 📦 Instalación

### Prerrequisitos
- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd BackendMarketSoft
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
copy .env.example .env
```

Editar el archivo `.env` con las credenciales de tu base de datos:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marketsoft
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
NODE_ENV=development
```

4. **Crear la base de datos en PostgreSQL**

Ejecuta el script incluido en el proyecto:
```cmd
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d postgres -f "database.sql"
```

> Este script elimina y recrea la base de datos `marketsoft`. Las tablas y los datos de ejemplo se crean automáticamente al iniciar la aplicación.

5. **Ejecutar la aplicación**
```bash
npm start
```

Al iniciar por primera vez, la aplicación:
- Crea todas las tablas automáticamente (Sequelize ORM)
- Inserta datos de ejemplo (3 proveedores, 8 productos, 3 usuarios, 3 ventas)

Para modo desarrollo con auto-reload:
```bash
npm run dev
```

## 🚀 Endpoints de la API

La API estará disponible en: `http://localhost:3000/api`

Documentación interactiva Swagger: `http://localhost:3000/api-docs`

---

### Proveedores (Providers)

| Método | Endpoint             | Descripción                   |
|--------|----------------------|-------------------------------|
| GET    | `/api/providers`     | Obtener todos los proveedores |
| GET    | `/api/providers/:id` | Obtener proveedor por ID      |
| POST   | `/api/providers`     | Crear nuevo proveedor         |
| PUT    | `/api/providers/:id` | Actualizar proveedor          |
| DELETE | `/api/providers/:id` | Eliminar proveedor            |

**Ejemplo - Crear Proveedor:**
```json
POST /api/providers
{
  "name": "Distribuidora ABC",
  "phone": "+57 300 123 4567",
  "email": "contacto@abc.com",
  "city": "Bogotá"
}
```

---

### Productos (Products)

| Método | Endpoint            | Descripción                 |
|--------|---------------------|-----------------------------|
| GET    | `/api/products`     | Obtener todos los productos |
| GET    | `/api/products/:id` | Obtener producto por ID     |
| POST   | `/api/products`     | Crear nuevo producto        |
| PUT    | `/api/products/:id` | Actualizar producto         |
| DELETE | `/api/products/:id` | Eliminar producto           |

**Ejemplo - Crear Producto:**
```json
POST /api/products
{
  "name": "Arroz Diana",
  "description": "Arroz blanco de primera calidad 1kg",
  "price": 4500.00,
  "stock": 150,
  "providerId": 1
}
```

**Validaciones:**
- `price`: Debe ser mayor a 0
- `stock`: No puede ser negativo

---

### Usuarios (Users)

| Método | Endpoint         | Descripción                |
|--------|------------------|----------------------------|
| GET    | `/api/users`     | Obtener todos los usuarios |
| GET    | `/api/users/:id` | Obtener usuario por ID     |
| POST   | `/api/users`     | Crear nuevo usuario        |
| PUT    | `/api/users/:id` | Actualizar usuario         |
| DELETE | `/api/users/:id` | Eliminar usuario           |

**Ejemplo - Crear Usuario:**
```json
POST /api/users
{
  "name": "Juan Pérez",
  "email": "juan.perez@marketsoft.com",
  "role": "cashier"
}
```

**Validaciones:**
- `email`: Debe ser único en el sistema

---

### Ventas (Sales)

| Método | Endpoint         | Descripción                         |
|--------|------------------|-------------------------------------|
| GET    | `/api/sales`     | Obtener todas las ventas            |
| GET    | `/api/sales/:id` | Obtener venta por ID                |
| POST   | `/api/sales`     | Crear nueva venta                   |
| PUT    | `/api/sales/:id` | No permitido (total auto-calculado) |
| DELETE | `/api/sales/:id` | Eliminar venta                      |

**Ejemplo - Crear Venta:**
```json
POST /api/sales
{
  "userId": 1,
  "details": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

**Notas:**
- El `total` se calcula automáticamente basado en los detalles
- El stock de los productos se actualiza automáticamente
- Valida disponibilidad de stock antes de crear la venta

---

### Detalles de Venta (Sale Details)

| Método | Endpoint                | Descripción                |
|--------|-------------------------|----------------------------|
| GET    | `/api/sale-details`     | Obtener todos los detalles |
| GET    | `/api/sale-details/:id` | Obtener detalle por ID     |
| POST   | `/api/sale-details`     | Crear nuevo detalle        |
| PUT    | `/api/sale-details/:id` | Actualizar detalle         |
| DELETE | `/api/sale-details/:id` | Eliminar detalle           |

---

## 🗃️ Modelo de Datos

### Entidades y Relaciones

```
Proveedor (1) ────< (N) Producto
Usuario (1) ────< (N) Venta
Venta (1) ────< (N) DetalleVenta >──── (1) Producto
```

### Tablas

**providers**
- id, name, phone, email, city, createdAt, updatedAt

**products**
- id, name, description, price, stock, providerId, createdAt, updatedAt

**users**
- id, name, email, role, createdAt, updatedAt

**sales**
- id, userId, date, total, createdAt, updatedAt

**sale_details**
- id, saleId, productId, quantity, price, createdAt, updatedAt

---

## 📁 Estructura del Proyecto

```
BackendMarketSoft/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de Sequelize y PostgreSQL
│   ├── models/
│   │   ├── index.js             # Asociaciones entre modelos
│   │   ├── Provider.js          # Modelo Proveedor
│   │   ├── Product.js           # Modelo Producto
│   │   ├── User.js              # Modelo Usuario
│   │   ├── Sale.js              # Modelo Venta
│   │   └── SaleDetail.js        # Modelo DetalleVenta
│   ├── controllers/
│   │   ├── providerController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── saleController.js
│   │   └── saleDetailController.js
│   ├── routes/
│   │   ├── index.js             # Router principal
│   │   ├── providerRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── saleRoutes.js
│   │   └── saleDetailRoutes.js
│   ├── validators/               # Validaciones adicionales
│   ├── swagger/
│   │   └── swagger.js           # Configuración de Swagger
│   └── seed.js                  # Datos de ejemplo para desarrollo
├── server.js                    # Punto de entrada principal
├── database.sql                 # Script de creación de base de datos
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## ✅ Respuestas de la API

Todas las respuestas siguen el formato JSON:

**Éxito:**
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos"
}
```

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor con auto-reload |

---

## 📝 Notas Importantes

- Las tablas se crean automáticamente al ejecutar `npm start`
- Los datos de ejemplo se insertan automáticamente en modo desarrollo
- Las ventas no pueden actualizarse manualmente (el total es auto-calculado)
- Todos los endpoints retornan respuestas en formato JSON
- Swagger UI está disponible en `/api-docs`

---

## 🐛 Solución de Problemas

**Error de conexión a PostgreSQL:**
- Verificar que el servicio esté corriendo
- Confirmar credenciales en `.env`
- Ejecutar el script `database.sql` para crear la base de datos

**Puerto en uso:**
- Cambiar el `PORT` en el archivo `.env`

**Error de dependencias:**
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

**No hay datos de ejemplo:**
- Asegurar que `NODE_ENV=development` en el archivo `.env`
- Reiniciar la aplicación con `npm start`

---

## 📄 Licencia
ISC

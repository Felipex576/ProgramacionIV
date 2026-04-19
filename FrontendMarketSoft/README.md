# MarketSoft - Supermarket Management System Frontend

## 📋 Descripción
Single Page Application (SPA) desarrollada en React para la interfaz de usuario del sistema de gestión de supermercados **MarketSoft**. Permite a los usuarios interactuar con la API REST del backend para gestionar de forma completa e interactiva los módulos de productos, proveedores, usuarios y ventas.

## 👥 Equipo de Desarrollo

| Nombre                    | Responsabilidades                                                              |
|---------------------------|--------------------------------------------------------------------------------|
| Luis Felipe Clavijo Acuña | Diseño de UI/UX, componentes React, integración con API (Axios), enrutamiento  |

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React.js 19
- **Build Tool:** Vite
- **Cliente HTTP:** Axios
- **Enrutamiento:** React Router DOM
- **Estilos:** Bootstrap + React Bootstrap
- **Notificaciones:** React Toastify
- **Arquitectura:** Component-Based Architecture + Service Layer

## 📦 Instalación

### Prerrequisitos
- Node.js >= 18.x
- npm o yarn
- El [Backend de MarketSoft](../BackendMarketSoft) debe estar en ejecución (puerto 3000 por defecto).

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd BackendMarketSoft
```

2. **Navegar al directorio del frontend**
```bash
cd FrontendMarketSoft
```

3. **Instalar dependencias**
```bash
npm install
```

4. **Ejecutar la aplicación**
```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en: `http://localhost:5173`

Para construir la versión de producción:
```bash
npm run build
```

## 🚀 Funcionalidades por Módulo

La interfaz cuenta con un panel principal (Dashboard) que permite acceder rápidamente a cada módulo del sistema.

### Proveedores (Providers)
- Visualización de la lista de proveedores en formato de tabla.
- Formulario modal para añadir nuevos proveedores.
- Edición en línea de la información del proveedor.
- Eliminación de proveedores.

### Productos (Products)
- Visualización de la lista de productos en formato de tabla.
- Indicadores visuales automáticos para "Stock Bajo" (≤ 10).
- Formulario para registrar productos asignándolos dinámicamente a un proveedor existente.
- Edición y eliminación de productos.

### Usuarios (Users)
- Visualización de usuarios registrados.
- Etiquetas de colores para diferenciar los roles (Administrador, Gerente, Cajero).
- Formulario para gestionar accesos.

### Ventas (Sales)
- Registro interactivo de ventas.
- Funcionalidad para agregar múltiples productos a una misma venta, calculando subtotales y el total dinámicamente.
- **Validación de stock en tiempo real:** Previene que se añadan productos a la venta si la cantidad supera el inventario disponible.
- Modal de vista detallada (factura) para consultar los detalles de una venta ya realizada.

---

## 📁 Estructura del Proyecto

```
FrontendMarketSoft/
├── src/
│   ├── components/
│   │   └── Layout.jsx           # Contenedor principal y barra de navegación
│   ├── pages/
│   │   ├── Home.jsx             # Panel principal (Dashboard)
│   │   ├── Products.jsx         # Módulo de Productos
│   │   ├── Providers.jsx        # Módulo de Proveedores
│   │   ├── Sales.jsx            # Módulo de Ventas
│   │   └── Users.jsx            # Módulo de Usuarios
│   ├── services/
│   │   ├── api.js               # Configuración central de Axios
│   │   ├── productService.js    # Consumo de endpoints de productos
│   │   ├── providerService.js   # Consumo de endpoints de proveedores
│   │   ├── saleService.js       # Consumo de endpoints de ventas
│   │   └── userService.js       # Consumo de endpoints de usuarios
│   ├── App.jsx                  # Configuración de Rutas (React Router)
│   └── main.jsx                 # Punto de entrada de React
├── index.html                   # Plantilla HTML principal
├── vite.config.js               # Configuración de Vite
├── package.json
└── README.md
```

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo usando Vite |
| `npm run build` | Construye la aplicación optimizada para producción |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## 🐛 Solución de Problemas

**Error de red (Network Error) al cargar datos o guardar:**
- Verifica que el proyecto `BackendMarketSoft` esté en ejecución en la terminal.
- Comprueba que el backend esté utilizando el puerto `3000`. Si utiliza otro puerto, debes actualizar la URL base en `src/services/api.js`.

**Error al iniciar con Vite (`'vite' no se reconoce como un comando interno...`):**
- Asegúrate de haber ejecutado `npm install` antes de `npm start`.
- Si el problema persiste, elimina la carpeta `node_modules` y vuelve a instalar:
```bash
rmdir /s /q node_modules
npm install
```

---

## 📄 Licencia
ISC

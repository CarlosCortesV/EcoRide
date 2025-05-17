# Backend para EcoRide

Backend para la aplicación EcoRide que proporciona una API REST para acceder a los datos de los productos almacenados en MySQL.

## Requisitos

- Node.js (v14+)
- MySQL (v8+)

## Configuración

1. Instalar las dependencias:
   ```
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=carlos12
   DB_NAME=ecoride
   PORT=3000
   ```

3. Crear la base de datos y la tabla de productos:
   ```
   mysql -u root -p < db/schema.sql
   ```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```
npm run dev
```

Para iniciar el servidor en modo producción:
```
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/products | Obtener todos los productos |
| GET | /api/products/:id | Obtener un producto por ID |
| POST | /api/products | Crear un nuevo producto |
| PUT | /api/products/:id | Actualizar un producto existente |
| DELETE | /api/products/:id | Eliminar un producto |

## Estructura del proyecto

```
backend/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   └── productController.js
  ├── db/
  │   └── schema.sql
  ├── models/
  │   └── productModel.js
  ├── routes/
  │   └── products.js
  ├── .env
  ├── package.json
  ├── README.md
  └── server.js
``` 
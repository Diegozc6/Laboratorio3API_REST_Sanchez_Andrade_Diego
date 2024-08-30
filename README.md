# Gestión de Productos API

Esta es una API RESTful desarrollada con Express.js y MariaDB para gestionar productos y categorías. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en productos y categorías.

## Requisitos

- Node.js (v14.x o superior)
- MariaDB (v10.x o superior)

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu-usuario/gestion-productos-api.git
    cd gestion-productos-api
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Configura la base de datos en MariaDB:

    - Crea una base de datos llamada `gestion_productos` en phpMyAdmin o desde la línea de comandos.
    - Importa el archivo `database.sql` que se encuentra en la raíz del proyecto para crear las tablas `categorias` y `productos`.

    ```sql
    CREATE DATABASE gestion_productos;
    USE gestion_productos;

    -- Crear tabla categorias
    CREATE TABLE categorias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL
    );

    -- Crear tabla productos
    CREATE TABLE productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        categoriaId INT,
        FOREIGN KEY (categoriaId) REFERENCES categorias(id) ON DELETE SET NULL
    );

    -- Insertar datos iniciales en categorias
    INSERT INTO categorias (nombre) VALUES ('Electrónica'), ('Ropa'), ('Alimentos');
    ```

4. Configura la conexión a la base de datos:

    - Crea un archivo `db.js` en la raíz del proyecto con el siguiente contenido:

    ```javascript
    const mysql = require('mysql2/promise');

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'tu_usuario',
        password: 'tu_contraseña',
        database: 'gestion_productos',
    });

    module.exports = pool;
    ```

5. Inicia la aplicación:

    ```bash
    node index.js
    ```

6. La API estará disponible en `http://localhost:3001`.

## Endpoints

### Categorías

- `GET /categorias` - Obtener todas las categorías.
- `POST /categorias` - Crear una nueva categoría.
- `PUT /categorias/:id` - Actualizar una categoría existente.
- `DELETE /categorias/:id` - Eliminar una categoría.

### Productos

- `GET /productos` - Obtener todos los productos.
- `POST /productos` - Crear un nuevo producto.
- `PUT /productos/:id` - Actualizar un producto existente.
- `DELETE /productos/:id` - Eliminar un producto.

## Estructura del Proyecto

- `index.js`: Archivo principal de la aplicación.
- `db.js`: Archivo de configuración de la base de datos.
- `package.json`: Dependencias y scripts del proyecto.

## Notas

- Asegúrate de que MariaDB esté corriendo antes de iniciar la aplicación.
- Configura el archivo `db.js` con tus credenciales de base de datos.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

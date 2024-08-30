const express = require('express');
const pool = require('./db'); // Asegúrate de que el archivo 'db.js' esté correctamente configurado.
const cors = require('cors');
const app = express();

// Configuración de CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener todas las categorías
app.get('/categorias', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener categorías:', error.message);
        res.status(500).json({ error: 'No se pudieron cargar las categorías' });
    }
});

// Ruta para crear una nueva categoría
// Ruta para crear un nuevo producto
app.post('/productos', async (req, res) => {
    const { nombre, categoriaId } = req.body;

    if (!nombre || categoriaId === undefined) {
        return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, categoriaId) VALUES (?, ?)',
            [nombre, categoriaId]
        );
        res.status(201).json({ id: result.insertId, nombre, categoriaId });
    } catch (error) {
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ error: 'No se pudo crear el producto' });
    }
});


// Ruta para actualizar una categoría existente
app.put('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    try {
        const [result] = await pool.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ id, nombre });
    } catch (error) {
        console.error('Error al actualizar categoría:', error.message);
        res.status(500).json({ error: 'No se pudo actualizar la categoría' });
    }
});

// Ruta para eliminar una categoría
app.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar categoría:', error.message);
        res.status(500).json({ error: 'No se pudo eliminar la categoría' });
    }
});

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'No se pudieron cargar los productos' });
    }
});


// Ruta para crear un nuevo producto

app.post('/productos', async (req, res) => {
    const { nombre, categoriaId } = req.body;

    if (!nombre || categoriaId === undefined) {
        return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
    }

    try {
        // Verificar que la categoría existe
        const [categoria] = await pool.query('SELECT id FROM categorias WHERE id = ?', [categoriaId]);
        if (categoria.length === 0) {
            return res.status(400).json({ error: 'La categoría especificada no existe' });
        }

        // Inserción en la base de datos
        const [result] = await pool.query('INSERT INTO productos (nombre, categoriaId) VALUES (?, ?)', [nombre, categoriaId]);
        res.status(201).json({ id: result.insertId, nombre, categoriaId });
    } catch (error) {
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ error: 'No se pudo crear el producto' });
    }
});

// Ruta para actualizar un producto existente
app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, categoriaId } = req.body;

    if (!nombre || categoriaId === undefined) {
        return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
    }

    try {
        // Verificar que la categoría existe
        const [categoria] = await pool.query('SELECT id FROM categorias WHERE id = ?', [categoriaId]);
        if (categoria.length === 0) {
            return res.status(400).json({ error: 'La categoría especificada no existe' });
        }

        const [result] = await pool.query('UPDATE productos SET nombre = ?, categoriaId = ? WHERE id = ?', [nombre, categoriaId, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ id, nombre, categoriaId });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ error: 'No se pudo actualizar el producto' });
    }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ error: 'No se pudo eliminar el producto' });
    }
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});

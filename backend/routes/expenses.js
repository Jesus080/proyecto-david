const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todos los gastos del usuario
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    
    let query = `
      SELECT e.*, c.name as category_name, c.color as category_color
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.user_id = $1
    `;
    const params = [req.userId];
    let paramIndex = 2;

    if (startDate) {
      query += ` AND e.date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      query += ` AND e.date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    if (category) {
      query += ` AND e.category_id = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    query += ' ORDER BY e.date DESC, e.created_at DESC';

    const result = await pool.query(query, params);
    res.json({ expenses: result.rows });
  } catch (error) {
    console.error('Error al obtener gastos:', error);
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
});

// Crear nuevo gasto
router.post('/', [
  body('amount').isFloat({ min: 0.01 }),
  body('description').trim().notEmpty(),
  body('date').isISO8601(),
  body('category_id').isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description, date, category_id } = req.body;

    // Verificar que la categoría pertenezca al usuario
    const categoryCheck = await pool.query(
      'SELECT id FROM categories WHERE id = $1 AND user_id = $2',
      [category_id, req.userId]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Categoría no válida' });
    }

    const result = await pool.query(
      `INSERT INTO expenses (user_id, amount, description, date, category_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.userId, amount, description, date, category_id]
    );

    res.status(201).json({
      message: 'Gasto creado exitosamente',
      expense: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear gasto:', error);
    res.status(500).json({ error: 'Error al crear gasto' });
  }
});

// Actualizar gasto
router.put('/:id', [
  body('amount').optional().isFloat({ min: 0.01 }),
  body('description').optional().trim().notEmpty(),
  body('date').optional().isISO8601(),
  body('category_id').optional().isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { amount, description, date, category_id } = req.body;

    // Verificar que el gasto pertenezca al usuario
    const expenseCheck = await pool.query(
      'SELECT id FROM expenses WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );

    if (expenseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }

    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (amount !== undefined) {
      updates.push(`amount = $${paramIndex}`);
      params.push(amount);
      paramIndex++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      params.push(description);
      paramIndex++;
    }
    if (date !== undefined) {
      updates.push(`date = $${paramIndex}`);
      params.push(date);
      paramIndex++;
    }
    if (category_id !== undefined) {
      updates.push(`category_id = $${paramIndex}`);
      params.push(category_id);
      paramIndex++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay datos para actualizar' });
    }

    params.push(id, req.userId);
    const query = `
      UPDATE expenses
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
      RETURNING *
    `;

    const result = await pool.query(query, params);
    res.json({
      message: 'Gasto actualizado exitosamente',
      expense: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar gasto:', error);
    res.status(500).json({ error: 'Error al actualizar gasto' });
  }
});

// Eliminar gasto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }

    res.json({ message: 'Gasto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar gasto:', error);
    res.status(500).json({ error: 'Error al eliminar gasto' });
  }
});

// Obtener estadísticas
router.get('/stats/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = `
      SELECT 
        COUNT(*) as total_expenses,
        COALESCE(SUM(amount), 0) as total_amount,
        COALESCE(AVG(amount), 0) as avg_amount,
        MIN(date) as first_expense,
        MAX(date) as last_expense
      FROM expenses
      WHERE user_id = $1
    `;
    const params = [req.userId];
    let paramIndex = 2;

    if (startDate) {
      query += ` AND date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      query += ` AND date <= $${paramIndex}`;
      params.push(endDate);
    }

    const result = await pool.query(query, params);
    
    // Gastos por categoría
    let categoryQuery = `
      SELECT 
        c.id, c.name, c.color,
        COUNT(e.id) as expense_count,
        COALESCE(SUM(e.amount), 0) as total_amount
      FROM categories c
      LEFT JOIN expenses e ON c.id = e.category_id AND e.user_id = $1
      WHERE c.user_id = $1
    `;
    const categoryParams = [req.userId];
    let catParamIndex = 2;

    if (startDate) {
      categoryQuery += ` AND (e.date IS NULL OR e.date >= $${catParamIndex})`;
      categoryParams.push(startDate);
      catParamIndex++;
    }

    if (endDate) {
      categoryQuery += ` AND (e.date IS NULL OR e.date <= $${catParamIndex})`;
      categoryParams.push(endDate);
    }

    categoryQuery += ' GROUP BY c.id, c.name, c.color ORDER BY total_amount DESC';

    const categoryResult = await pool.query(categoryQuery, categoryParams);

    res.json({
      summary: result.rows[0],
      byCategory: categoryResult.rows
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { format } from 'date-fns';
import './Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    category_id: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [expensesRes, categoriesRes] = await Promise.all([
        api.get('/expenses'),
        api.get('/categories')
      ]);
      setExpenses(expensesRes.data.expenses);
      setCategories(categoriesRes.data.categories);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense.id}`, formData);
      } else {
        await api.post('/expenses', formData);
      }
      setShowModal(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error guardando gasto:', error);
      alert('Error al guardar el gasto');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      category_id: expense.category_id
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este gasto?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      loadData();
    } catch (error) {
      console.error('Error eliminando gasto:', error);
      alert('Error al eliminar el gasto');
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      category_id: ''
    });
    setEditingExpense(null);
  };

  const openNewModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Cargando gastos...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="expenses-page">
        <div className="page-header">
          <h2 className="page-title">Mis Gastos</h2>
          <button onClick={openNewModal} className="btn btn-primary">
            ➕ Nuevo Gasto
          </button>
        </div>

        {expenses.length === 0 ? (
          <div className="card empty-state">
            <p>No tienes gastos registrados aún</p>
            <button onClick={openNewModal} className="btn btn-primary">
              Crear primer gasto
            </button>
          </div>
        ) : (
          <div className="expenses-grid">
            {expenses.map((expense) => {
              const category = categories.find(c => c.id === expense.category_id);
              return (
                <div key={expense.id} className="expense-card card">
                  <div className="expense-card-header">
                    <span
                      className="category-badge"
                      style={{ backgroundColor: category?.color }}
                    >
                      {category?.name || 'Sin categoría'}
                    </span>
                    <span className="expense-amount-large">
                      ${Number(expense.amount).toFixed(2)}
                    </span>
                  </div>
                  <p className="expense-description">{expense.description}</p>
                  <div className="expense-card-footer">
                    <small className="expense-date">
                      {format(new Date(expense.date), 'dd/MM/yyyy')}
                    </small>
                    <div className="expense-actions">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="btn-icon"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="btn-icon"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Monto</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="form-input"
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-outline"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingExpense ? 'Guardar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Expenses;

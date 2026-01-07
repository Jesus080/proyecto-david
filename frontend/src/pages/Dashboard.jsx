import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, expensesRes] = await Promise.all([
        api.get('/expenses/stats/summary'),
        api.get('/expenses?limit=5')
      ]);
      setStats(statsRes.data);
      setRecentExpenses(expensesRes.data.expenses.slice(0, 5));
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Cargando dashboard...</div>
      </Layout>
    );
  }

  const summary = stats?.summary || {};
  const totalAmount = Number(summary.total_amount) || 0;
  const avgAmount = Number(summary.avg_amount) || 0;
  const totalExpenses = Number(summary.total_expenses) || 0;

  return (
    <Layout>
      <div className="dashboard">
        <h2 className="page-title">Dashboard</h2>

        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Total Gastado</h3>
              <p className="stat-value">${totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>Total Gastos</h3>
              <p className="stat-value">{totalExpenses}</p>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Promedio</h3>
              <p className="stat-value">${avgAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="section card">
            <div className="section-header">
              <h3>Gastos Recientes</h3>
              <button
                onClick={() => navigate('/expenses')}
                className="btn btn-outline"
              >
                Ver todos
              </button>
            </div>

            {recentExpenses.length === 0 ? (
              <p className="empty-state">No hay gastos registrados aún</p>
            ) : (
              <div className="expenses-list">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="expense-item">
                    <div className="expense-category">
                      <span
                        className="category-badge"
                        style={{ backgroundColor: expense.category_color }}
                      >
                        {expense.category_name}
                      </span>
                    </div>
                    <div className="expense-details">
                      <p className="expense-description">{expense.description}</p>
                      <small className="expense-date">
                        {format(new Date(expense.date), 'dd MMM yyyy', { locale: es })}
                      </small>
                    </div>
                    <div className="expense-amount">
                      ${Number(expense.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section card">
            <h3>Por Categoría</h3>
            {stats?.byCategory && stats.byCategory.length > 0 ? (
              <div className="category-stats">
                {stats.byCategory.map((cat) => (
                  <div key={cat.id} className="category-stat-item">
                    <div className="category-info">
                      <span
                        className="category-color"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      <span>{cat.name}</span>
                    </div>
                    <span className="category-amount">
                      ${Number(cat.total_amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No hay datos de categorías</p>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <button
            onClick={() => navigate('/expenses')}
            className="btn btn-primary"
          >
            ➕ Nuevo Gasto
          </button>
          <button
            onClick={() => navigate('/stats')}
            className="btn btn-secondary"
          >
            📈 Ver Estadísticas
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

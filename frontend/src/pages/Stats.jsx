import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PieChart from '../components/PieChart';
import api from '../services/api';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import './Stats.css';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [customDates, setCustomDates] = useState({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });

  useEffect(() => {
    loadStats();
  }, [period, customDates]);

  const loadStats = async () => {
    try {
      let params = {};
      
      if (period === 'month') {
        params.startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
        params.endDate = format(endOfMonth(new Date()), 'yyyy-MM-dd');
      } else if (period === 'last-month') {
        const lastMonth = subMonths(new Date(), 1);
        params.startDate = format(startOfMonth(lastMonth), 'yyyy-MM-dd');
        params.endDate = format(endOfMonth(lastMonth), 'yyyy-MM-dd');
      } else if (period === 'custom') {
        params = customDates;
      }

      const response = await api.get('/expenses/stats/summary', { params });
      setStats(response.data);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setLoading(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Cargando estadísticas...</div>
      </Layout>
    );
  }

  const summary = stats?.summary || {};
  const totalAmount = Number(summary.total_amount) || 0;
  const avgAmount = Number(summary.avg_amount) || 0;
  const totalExpenses = Number(summary.total_expenses) || 0;
  const byCategory = stats?.byCategory || [];

  return (
    <Layout>
      <div className="stats-page">
        <h2 className="page-title">Estadísticas</h2>

        <div className="period-selector card">
          <button
            className={`period-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('month')}
          >
            Este mes
          </button>
          <button
            className={`period-btn ${period === 'last-month' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('last-month')}
          >
            Mes anterior
          </button>
          <button
            className={`period-btn ${period === 'all' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('all')}
          >
            Todo
          </button>
          <button
            className={`period-btn ${period === 'custom' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('custom')}
          >
            Personalizado
          </button>
        </div>

        {period === 'custom' && (
          <div className="custom-dates card">
            <div className="form-group">
              <label className="form-label">Desde</label>
              <input
                type="date"
                value={customDates.startDate}
                onChange={(e) => setCustomDates({ ...customDates, startDate: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hasta</label>
              <input
                type="date"
                value={customDates.endDate}
                onChange={(e) => setCustomDates({ ...customDates, endDate: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        )}

        <div className="stats-summary">
          <div className="summary-card card">
            <div className="summary-icon">💰</div>
            <div className="summary-info">
              <h3>Total Gastado</h3>
              <p className="summary-value">${totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-card card">
            <div className="summary-icon">📝</div>
            <div className="summary-info">
              <h3>Total Gastos</h3>
              <p className="summary-value">{totalExpenses}</p>
            </div>
          </div>

          <div className="summary-card card">
            <div className="summary-icon">📊</div>
            <div className="summary-info">
              <h3>Promedio por Gasto</h3>
              <p className="summary-value">${avgAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Gráfica de Pastel */}
        {byCategory.length > 0 && (
          <div className="card">
            <h3 className="section-title">📊 Distribución de Gastos</h3>
            <PieChart 
              data={byCategory.map(cat => ({
                label: cat.name,
                value: Number(cat.total_amount),
                color: cat.color,
                count: cat.expense_count
              }))}
              size={320}
            />
          </div>
        )}

        <div className="card">
          <h3 className="section-title">💳 Detalle por Categoría</h3>
          
          {byCategory.length === 0 ? (
            <p className="empty-state">No hay datos para mostrar</p>
          ) : (
            <div className="category-stats-list">
              {byCategory.map((cat) => {
                const percentage = totalAmount > 0 
                  ? (Number(cat.total_amount) / totalAmount * 100).toFixed(1)
                  : 0;
                
                return (
                  <div key={cat.id} className="category-stat">
                    <div className="category-stat-header">
                      <div className="category-info">
                        <span
                          className="category-color-dot"
                          style={{ backgroundColor: cat.color }}
                        ></span>
                        <span className="category-name">{cat.name}</span>
                      </div>
                      <div className="category-stat-amount">
                        <span className="amount">${Number(cat.total_amount).toFixed(2)}</span>
                        <span className="percentage">{percentage}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: cat.color
                        }}
                      ></div>
                    </div>
                    <div className="category-stat-footer">
                      <small>{cat.expense_count} gasto{cat.expense_count !== 1 ? 's' : ''}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Stats;

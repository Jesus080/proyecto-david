import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6'
  });

  const predefinedColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, formData);
      } else {
        await api.post('/categories', formData);
      }
      setShowModal(false);
      resetForm();
      loadCategories();
    } catch (error) {
      console.error('Error guardando categoría:', error);
      alert('Error al guardar la categoría');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (error) {
      console.error('Error eliminando categoría:', error);
      alert(error.response?.data?.error || 'Error al eliminar la categoría');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      color: '#3B82F6'
    });
    setEditingCategory(null);
  };

  const openNewModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Cargando categorías...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="categories-page">
        <div className="page-header">
          <h2 className="page-title">Categorías</h2>
          <button onClick={openNewModal} className="btn btn-primary">
            ➕ Nueva Categoría
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="card empty-state">
            <p>No tienes categorías creadas aún</p>
            <button onClick={openNewModal} className="btn btn-primary">
              Crear primera categoría
            </button>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card card">
                <div className="category-header">
                  <div className="category-title">
                    <span
                      className="category-color-indicator"
                      style={{ backgroundColor: category.color }}
                    ></span>
                    <h3>{category.name}</h3>
                  </div>
                  <div className="category-actions">
                    <button
                      onClick={() => handleEdit(category)}
                      className="btn-icon"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="btn-icon"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    required
                    placeholder="Ej: Comida, Transporte, Entretenimiento"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Color</label>
                  <div className="color-picker">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`color-option ${formData.color === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="form-input"
                  />
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
                    {editingCategory ? 'Guardar' : 'Crear'}
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

export default Categories;

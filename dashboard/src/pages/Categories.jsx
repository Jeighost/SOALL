import { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../services/api';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import CategoryForm from '../components/CategoryForm';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Eliminar la categoría "${name}"?`)) {
      try {
        await deleteCategory(id);
        toast.success('Categoría eliminada');
        fetchCategories();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al eliminar');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fucsia"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold">Categorías</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-fucsia hover:bg-fucsia-dark text-white px-4 py-2 rounded-lg transition"
        >
          <FiPlus size={18} />
          Nueva categoría
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div 
              className="h-24 p-4 flex items-center justify-between"
              style={{ background: cat.gradient }}
            >
              <span className="text-4xl">{cat.emoji}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(cat);
                    setShowForm(true);
                  }}
                  className="p-2 bg-white/80 backdrop-blur rounded-lg hover:bg-white transition"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cat._id, cat.name)}
                  className="p-2 bg-white/80 backdrop-blur rounded-lg hover:bg-white transition text-red-600"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-lg">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Slug: {cat.slug}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  cat.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {cat.active ? 'Activo' : 'Inactivo'}
                </span>
                <span className="text-xs text-gray-500">Orden: {cat.order}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setShowForm(false);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
};

export default Categories;

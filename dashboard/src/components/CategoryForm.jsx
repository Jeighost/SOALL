import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { createCategory, updateCategory } from '../services/api';
import toast from 'react-hot-toast';

const CategoryForm = ({ category, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: category || {
      name: '',
      slug: '',
      emoji: '📁',
      gradient: 'linear-gradient(145deg, #f5f0ff, #e8deff)',
      order: 0,
      active: true
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (category) {
        await updateCategory(category._id, data);
        toast.success('Categoría actualizada');
      } else {
        await createCategory(data);
        toast.success('Categoría creada');
      }
      onClose();
      navigate('/categories');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-display font-bold">
            {category ? 'Editar' : 'Nueva'} Categoría
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              {...register('name', { required: 'El nombre es requerido' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-fucsia focus:ring-1 focus:ring-fucsia outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              {...register('slug')}
              placeholder="nombre-de-categoria"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-fucsia focus:ring-1 focus:ring-fucsia outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Si se deja vacío, se genera automáticamente</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emoji
              </label>
              <input
                {...register('emoji')}
                placeholder="📁"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-fucsia focus:ring-1 focus:ring-fucsia outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orden
              </label>
              <input
                type="number"
                {...register('order')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-fucsia focus:ring-1 focus:ring-fucsia outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gradiente
            </label>
            <input
              {...register('gradient')}
              placeholder="linear-gradient(145deg, #f5f0ff, #e8deff)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-fucsia focus:ring-1 focus:ring-fucsia outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('active')}
              id="active"
              className="w-4 h-4 text-fucsia border-gray-300 rounded focus:ring-fucsia"
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Categoría activa
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-fucsia hover:bg-fucsia-dark text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              <FiSave size={18} />
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

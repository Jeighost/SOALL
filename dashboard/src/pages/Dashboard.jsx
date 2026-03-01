import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import { FiPackage, FiFolder, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    activeProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        const products = productsRes.data;
        setStats({
          products: products.length,
          categories: categoriesRes.data.length,
          activeProducts: products.filter(p => p.active).length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Productos totales',
      value: stats.products,
      icon: FiPackage,
      color: 'bg-blue-500',
      link: '/products'
    },
    {
      title: 'Categorías',
      value: stats.categories,
      icon: FiFolder,
      color: 'bg-green-500',
      link: '/categories'
    },
    {
      title: 'Productos activos',
      value: stats.activeProducts,
      icon: FiShoppingBag,
      color: 'bg-fucsia',
      link: '/products'
    },
    {
      title: 'En wishlist',
      value: 'Próximamente',
      icon: FiHeart,
      color: 'bg-purple-500',
      link: '#'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fucsia"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                <card.icon size={24} />
              </div>
              <span className="text-3xl font-display font-bold">{card.value}</span>
            </div>
            <h3 className="text-gray-600 text-sm">{card.title}</h3>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-display font-bold mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/products/new"
            className="px-6 py-3 bg-fucsia text-white rounded-lg hover:bg-fucsia-dark transition"
          >
            + Nuevo producto
          </Link>
          <Link
            to="/categories/new"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            + Nueva categoría
          </Link>
          <Link
            to="/settings"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Editar contenido
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
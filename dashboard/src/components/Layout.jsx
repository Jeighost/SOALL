import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiGrid, FiPackage, FiFolder, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/', icon: FiGrid, label: 'Dashboard' },
    { to: '/products', icon: FiPackage, label: 'Productos' },
    { to: '/categories', icon: FiFolder, label: 'Categorías' },
    { to: '/settings', icon: FiSettings, label: 'Contenido' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar móvil overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b">
          <h1 className="font-display text-2xl font-black">
            SO<span className="text-fucsia">ALL</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Panel de administración</p>
        </div>

        <nav className="p-4">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition
                ${isActive 
                  ? 'bg-fucsia-pale text-fucsia' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition mt-4"
          >
            <FiLogOut size={18} />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <p className="text-xs text-gray-500">
            Conectado como<br />
            <span className="font-medium text-gray-700">{user?.email}</span>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Header móvil */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu size={24} />
          </button>
          <h2 className="ml-3 font-display font-bold text-lg">SOALL Dashboard</h2>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
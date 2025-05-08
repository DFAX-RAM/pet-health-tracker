import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Bell, Info, Settings } from 'lucide-react';
import classNames from 'classnames';

const links = [
  { name: 'Dashboard', icon: <Home size={18} />, to: '/' },
  { name: 'Mascotas', icon: <User size={18} />, to: '/mascotas' },
  { name: 'Recordatorios', icon: <Bell size={18} />, to: '/recordatorios' },
  { name: 'Información', icon: <Info size={18} />, to: '/informacion' },
  { name: 'Configuración', icon: <Settings size={18} />, to: '/configuracion' },
];

export default function Sidebar({ mobileOpen }) {
  return (
    <aside
      className={classNames(
        'bg-gray-100 w-64 space-y-6 py-7 px-4 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform',
        { '-translate-x-full': !mobileOpen, 'translate-x-0': mobileOpen }
      )}
    >
      <nav>
        <ul>
          {links.map(({ name, icon, to }) => (
            <li key={name} className="mb-4">
              <Link
                to={to}
                className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-200"
              >
                {icon}
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}



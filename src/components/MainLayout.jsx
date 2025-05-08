// src/components/MainLayout.jsx

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  // Estado para menú móvil
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header recibe la función para togglear sidebar */}
      <Header toggleSidebar={() => setMobileOpen(!mobileOpen)} />

      <div className="flex flex-1">
        {/* Sidebar con estado de abierto/cerrado */}
        <Sidebar mobileOpen={mobileOpen} />

        {/* Aquí se inyectan las páginas via React Router */}
        <main className="flex-1 p-4 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}



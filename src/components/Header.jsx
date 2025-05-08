import React from 'react';
import { Menu } from 'lucide-react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Pet Health Tracker</h1>
      {/* Botón visible solo en md: sm-hidden */}
      <button
        className="md:hidden focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Abrir menú"
      >
        <Menu size={24} />
      </button>
      {/* Aquí podrías añadir otros botones en desktop */}
    </header>
  );
}
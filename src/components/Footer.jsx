import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Pet Health Tracker. Todos los derechos reservados.
    </footer>
  );
}


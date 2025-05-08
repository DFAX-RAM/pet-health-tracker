// src/components/Informacion.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react'; // ← Aquí importas Search

// Data de ejemplo de artículos  
const ARTICULOS = [
  {
    id: 1,
    titulo: 'Alimentación saludable',
    categoria: 'Nutrición',
    contenido: `Una dieta equilibrada ayuda a tu mascota a mantenerse fuerte y saludable…`
  },
  {
    id: 2,
    titulo: 'Ejercicio diario',
    categoria: 'Salud',
    contenido: `El ejercicio regular contribuye a la salud cardiovascular…`
  },
  {
    id: 3,
    titulo: 'Cómo cepillar el pelaje',
    categoria: 'Cuidado',
    contenido: `Cepillar el pelaje diariamente previene nudos y reduce el pelo suelto…`
  },
  {
    id: 4,
    titulo: 'Viajar con tu mascota',
    categoria: 'Viajes',
    contenido: `Para un viaje seguro, asegúrate de llevar su collar con identificación…`
  }
];

export default function Informacion() {
  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState(ARTICULOS);

  useEffect(() => {
    setFiltrados(
      ARTICULOS.filter(a =>
        a.titulo.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  }, [busqueda]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6">Información y Consejos</h2>

      {/* Buscador de artículos */}
      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar artículo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="flex-1 border p-2 rounded focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={() => {}}
          className="p-2 text-indigo-600 hover:text-indigo-800 transition"
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Grid de artículos */}
      {filtrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtrados.map(art => (
            <Link to={`/informacion/${art.id}`} key={art.id}>
              <article className="p-4 border rounded-lg hover:shadow transition">
                <h3 className="text-xl font-semibold mb-2">{art.titulo}</h3>
                <p className="text-sm text-gray-500">Categoría: {art.categoria}</p>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No se encontraron artículos.</p>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Data de ejemplo de artículos
const ARTICULOS = [
  { id: 1, titulo: 'Alimentación saludable', categoria: 'Nutrición' },
  { id: 2, titulo: 'Ejercicio diario', categoria: 'Salud' },
  { id: 3, titulo: 'Cómo cepillar el pelaje', categoria: 'Cuidado' },
  { id: 4, titulo: 'Viajar con tu mascota', categoria: 'Viajes' },
];

export default function Informacion() {
  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState(ARTICULOS);

  useEffect(() => {
    setFiltrados(
      ARTICULOS.filter((a) =>
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
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 border p-2 rounded focus:ring focus:ring-indigo-200"
        />
        <Search className="text-indigo-600" />
      </div>

      {/* Grid de artículos */}
      {filtrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtrados.map((art) => (
            <article
              key={art.id}
              className="p-4 border rounded-lg hover:shadow transition"
            >
              <h3 className="text-xl font-semibold mb-2">{art.titulo}</h3>
              <p className="text-sm text-gray-500">Categoría: {art.categoria}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No se encontraron artículos.</p>
      )}
    </div>
  );
}

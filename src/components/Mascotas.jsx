import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Trash2 } from 'lucide-react';

export default function Mascotas() {
  const { mascotas, setMascotas } = useContext(AppContext);
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [termSearch, setTermSearch] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !especie.trim()) return;
    setMascotas([
      ...mascotas,
      { id: Date.now(), nombre, especie, fecha: new Date().toISOString() },
    ]);
    setNombre('');
    setEspecie('');
  };

  const handleBuscar = () => setBusqueda(termSearch);

  const mascotasFiltradas = mascotas.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6">Mis Mascotas</h2>

      {/* Formulario de alta */}
      <form onSubmit={handleAgregar} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          className="border p-2 rounded focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Agregar
        </button>
      </form>

      {/* Buscador */}
      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar mascotas..."
          value={termSearch}
          onChange={(e) => setTermSearch(e.target.value)}
          className="flex-1 border p-2 rounded focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={handleBuscar}
          className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Listado en grid */}
      {mascotasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotasFiltradas.map((m) => (
            <div
              key={m.id}
              className="bg-gray-50 border rounded-lg shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold">{m.nombre}</h3>
                <p className="text-gray-600">{m.especie}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Creado: {new Date(m.fecha).toLocaleDateString('es-ES')}
                </span>
                <button
                  onClick={() =>
                    setMascotas(mascotas.filter((x) => x.id !== m.id))
                  }
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label={`Eliminar ${m.nombre}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay mascotas que mostrar.</p>
      )}
    </div>
  );
}




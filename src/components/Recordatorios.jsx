import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2 } from 'lucide-react';

export default function Recordatorios() {
  const { recordatorios, setRecordatorios } = useContext(AppContext);
  const [texto, setTexto] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('vacuna');
  const intervalRef = useRef();

  // Este useEffect para las alertas (móvil) podría moverse al AppContext
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const hoy = new Date().toDateString();
      recordatorios.forEach((r) => {
        if (new Date(r.fecha).toDateString() === hoy && !r.notificado) {
          alert(`🔔 Hoy: ${r.categoria.toUpperCase()} – ${r.texto}`);
          setRecordatorios((prev) =>
            prev.map((x) =>
              x.id === r.id ? { ...x, notificado: true } : x
            )
          );
        }
      });
    }, 60_000);
    return () => clearInterval(intervalRef.current);
  }, [recordatorios, setRecordatorios]);

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!texto.trim() || !fecha) return;
    setRecordatorios([
      ...recordatorios,
      { id: Date.now(), texto, fecha, categoria, notificado: false },
    ]);
    setTexto('');
    setFecha('');
    setCategoria('vacuna');
  };

  // Eliminar
  const handleEliminar = (id) =>
    setRecordatorios(recordatorios.filter((r) => r.id !== id));

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-4">Recordatorios</h2>

      {/* Formulario */}
      <form onSubmit={handleAgregar} className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="vacuna">Vacuna</option>
          <option value="visita">Visita Veterinario</option>
          <option value="baño">Baño</option>
          <option value="otro">Otro</option>
        </select>

        <input
          type="text"
          placeholder="Descripción"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Agregar
        </button>
      </form>

      {/* Listado */}
      {recordatorios.length > 0 ? (
        <ul className="space-y-4">
          {recordatorios
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
            .map((r) => (
              <li
                key={r.id}
                className="p-4 border-l-4 rounded bg-green-50 flex justify-between items-center"
                style={{
                  borderColor:
                    r.categoria === 'vacuna'
                      ? '#3b82f6'
                      : r.categoria === 'visita'
                      ? '#10b981'
                      : r.categoria === 'baño'
                      ? '#f59e0b'
                      : '#6b7280',
                }}
              >
                <div>
                  <div className="font-semibold">
                    [{r.categoria.toUpperCase()}] {r.texto}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(r.fecha).toLocaleDateString('es-ES')}
                  </div>
                </div>
                <button
                  onClick={() => handleEliminar(r.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay recordatorios.</p>
      )}
    </div>
  );
}
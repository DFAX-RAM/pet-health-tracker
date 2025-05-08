import React, { useEffect, useState } from 'react';
import { Bell, User, Box } from 'lucide-react';

export default function Dashboard() {
  const [proximos, setProximos] = useState([]);

  // Leer recordatorios de localStorage y tomar los 3 más próximos
  useEffect(() => {
    const data = localStorage.getItem('recordatorios');
    if (!data) return;
    const arr = JSON.parse(data)
      .filter((r) => new Date(r.fecha) >= new Date())
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .slice(0, 3);
    setProximos(arr);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow flex items-center space-x-3">
          <User size={32} className="text-blue-600" />
          <div>
            <div className="text-xl font-semibold">
              {localStorage.getItem('mascotas')
                ? JSON.parse(localStorage.getItem('mascotas')).length
                : 0}
            </div>
            <div className="text-gray-600">Mascotas registradas</div>
          </div>
        </div>
        <div className="p-4 bg-green-100 rounded shadow flex items-center space-x-3">
          <Bell size={32} className="text-green-600" />
          <div>
            <div className="text-xl font-semibold">
              {proximos.length}
            </div>
            <div className="text-gray-600">Próximos recordatorios</div>
          </div>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow flex items-center space-x-3">
          <Box size={32} className="text-yellow-600" />
          <div>
            <div className="text-xl font-semibold">
              {
                JSON.parse(localStorage.getItem('recordatorios') || '[]')
                  .filter((r) => r.categoria === 'vacuna').length
              }
            </div>
            <div className="text-gray-600">Vacunas programadas</div>
          </div>
        </div>
      </div>

      {/* Próximos 3 recordatorios */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-2xl font-semibold mb-4">Próximos eventos</h3>
        {proximos.length > 0 ? (
          <ul className="space-y-3">
            {proximos.map((r) => (
              <li
                key={r.id}
                className="p-3 border rounded flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">
                    {r.categoria.toUpperCase()}
                  </span>{' '}
                  – {r.texto}
                  <div className="text-sm text-gray-600">
                    {new Date(r.fecha).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay eventos próximos.</p>
        )}
      </div>
    </div>
  );
}



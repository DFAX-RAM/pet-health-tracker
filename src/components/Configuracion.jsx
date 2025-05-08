import React, { useState, useEffect } from 'react';
import { Sun, Moon, Bell } from 'lucide-react';

export default function Configuracion() {
  // Estado para notificaciones y tema
  const [notificaciones, setNotificaciones] = useState(true);
  const [tema, setTema] = useState('light');

  // Cargar preferencias
  useEffect(() => {
    const notif = localStorage.getItem('pref_notif');
    const theme = localStorage.getItem('pref_tema');
    if (notif !== null) setNotificaciones(JSON.parse(notif));
    if (theme) setTema(theme);
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('pref_notif', JSON.stringify(notificaciones));
  }, [notificaciones]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark');
    localStorage.setItem('pref_tema', tema);
  }, [tema]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6">Configuración</h2>

      {/* Notificaciones */}
      <div className="mb-6 flex items-center space-x-3">
        <Bell className="text-xl text-gray-700" />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notificaciones}
            onChange={() => setNotificaciones((v) => !v)}
            className="h-5 w-5"
          />
          <span>
            {notificaciones ? 'Notificaciones activadas' : 'Notificaciones desactivadas'}
          </span>
        </label>
      </div>

      {/* Tema */}
      <div className="mb-6 flex items-center space-x-3">
        {tema === 'light' ? (
          <Sun className="text-xl text-yellow-500" />
        ) : (
          <Moon className="text-xl text-gray-300" />
        )}
        <select
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="light">Modo Claro</option>
          <option value="dark">Modo Oscuro</option>
        </select>
      </div>

      {/* Información de ayuda */}
      <p className="text-sm text-gray-600">
        Tus preferencias se guardarán automáticamente y se aplicarán al recargar la página.
      </p>
    </div>
  );
}

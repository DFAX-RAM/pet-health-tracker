import React, { createContext, useState, useEffect } from 'react';

// 1. Crea el contexto
export const AppContext = createContext();

// 2. Proveedor que envuelve toda la app
export function AppProvider({ children }) {
  // Estado global
  const [mascotas, setMascotas] = useState([]);
  const [recordatorios, setRecordatorios] = useState([]);
  const [notificaciones, setNotificaciones] = useState(true);
  const [tema, setTema] = useState('light');

  // Carga inicial desde localStorage
  useEffect(() => {
    const m = localStorage.getItem('mascotas');
    const r = localStorage.getItem('recordatorios');
    const notif = localStorage.getItem('pref_notif');
    const theme = localStorage.getItem('pref_tema');
    if (m) setMascotas(JSON.parse(m));
    if (r) setRecordatorios(JSON.parse(r));
    if (notif !== null) setNotificaciones(JSON.parse(notif));
    if (theme) setTema(theme);
  }, []);

  // Guarda cuando cambian
  useEffect(() => {
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
  }, [mascotas]);

  useEffect(() => {
    localStorage.setItem('recordatorios', JSON.stringify(recordatorios));
  }, [recordatorios]);

  useEffect(() => {
    localStorage.setItem('pref_notif', JSON.stringify(notificaciones));
  }, [notificaciones]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark');
    localStorage.setItem('pref_tema', tema);
  }, [tema]);

  // Aquí puedes implementar también la lógica de alertas de recordatorios
  // (el setInterval que tenías antes podría ir aquí)

  const value = {
    mascotas,
    setMascotas,
    recordatorios,
    setRecordatorios,
    notificaciones,
    setNotificaciones,
    tema,
    setTema,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

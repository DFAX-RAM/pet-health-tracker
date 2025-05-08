// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';
import Mascotas from './components/Mascotas';
import Recordatorios from './components/Recordatorios';
import Informacion from './components/Informacion';
import ArticleDetail from './components/ArticleDetail';        // ← Importa tu detalle
import Configuracion from './components/Configuracion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index                 element={<Dashboard />} />
          <Route path="mascotas"       element={<Mascotas />} />
          <Route path="recordatorios"  element={<Recordatorios />} />
          <Route path="informacion"    element={<Informacion />} />
          <Route path="informacion/:id" element={<ArticleDetail />} />  {/* ← Aquí */}
          <Route path="configuracion"  element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

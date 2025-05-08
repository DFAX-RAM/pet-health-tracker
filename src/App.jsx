import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import Mascotas from "./components/Mascotas";
import Recordatorios from "./components/Recordatorios";
import Informacion from "./components/Informacion";
import Configuracion from "./components/Configuracion";
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="mascotas" element={<Mascotas />} />
            <Route path="recordatorios" element={<Recordatorios />} />
            <Route path="informacion" element={<Informacion />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
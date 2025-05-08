import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ARTICULOS = [
  { id: 1, titulo: 'Alimentación saludable', categoria: 'Nutrición', contenido: 'Contenido completo...' },
  { id: 2, titulo: 'Ejercicio diario', categoria: 'Salud', contenido: 'Contenido completo...' },
  { id: 3, titulo: 'Cómo cepillar el pelaje', categoria: 'Cuidado', contenido: 'Contenido completo...' },
  { id: 4, titulo: 'Viajar con tu mascota', categoria: 'Viajes', contenido: 'Contenido completo...' },
];

export default function ArticleDetail() {
  const { id } = useParams();
  const art = ARTICULOS.find(a => a.id === Number(id));

  if (!art) {
    return (
      <div className="p-6">
        <p>Artículo no encontrado.</p>
        <Link to="/informacion" className="text-blue-600 hover:underline">Volver</Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-3xl font-bold">{art.titulo}</h2>
      <p className="text-sm text-gray-500">Categoría: {art.categoria}</p>
      <div className="prose">
        {art.contenido.split('\n').map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <Link to="/informacion" className="text-blue-600 hover:underline">← Volver</Link>
    </div>
  );
}

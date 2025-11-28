//Archivo: react-router/src/pages/JuegosDetalle.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJuego } from '../hooks/useJuegos';

/**
 * Página: Detalle de un Juego (Tomo)
 */
const JuegosDetalle = () => {
    const { id } = useParams();
    const { juego, loading, error } = useJuego(id);
    
    // --- ESTADOS DE CARGA / ERROR ---
    if (loading) return <div className="text-amber-500 text-center p-10">Consultando archivos del tomo...</div>;
    if (error) return <div className="text-red-400 text-center p-10">Error: {error}</div>;
    if (!juego || !juego._id) return <div className="text-slate-500 text-center p-10">Tomo no encontrado.</div>;

    return (
        <div className='max-w-4xl mx-auto p-4 md:p-8 animate-fade-in'>
            <Link to="/juegos" className="group text-slate-400 hover:text-amber-400 mb-6 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver al Compendio</span>
            </Link>

            <div className="bg-slate-900 border border-amber-800/40 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
                
                {/* --- PORTADA --- */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img 
                        src={juego.imagen || "https://via.placeholder.com/300x400?text=Sin+Portada"} 
                        alt={juego.nombre} 
                        className="w-full object-cover rounded-lg border border-amber-900/50 shadow-xl"
                    />
                    
                    <Link
                        to={`/juegos/editar/${juego._id}`}
                        className="mt-4 block w-full text-center py-2.5 bg-amber-900/30 hover:bg-amber-700/50 text-amber-200 text-sm font-bold rounded-lg border border-amber-700/30 transition-colors"
                    >
                        ✏️ Editar Tomo
                    </Link>
                </div>

                {/* --- DETALLES --- */}
                <div className="flex-1">
                    <div className="border-b border-amber-900/30 pb-4 mb-4">
                        <h1 className='text-4xl font-bold font-serif text-amber-500 mb-1'>{juego.nombre}</h1>
                        <p className="text-slate-400 italic text-sm">{juego.editorial} ({juego.year})</p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-amber-100/90 text-lg">
                            <strong className="text-amber-500 font-bold">Categoría:</strong> {juego.categoria}
                        </p>
                        <p className="text-amber-100/90 text-lg">
                            <strong className="text-amber-500 font-bold">Precio (Monedas):</strong> ${juego.precio?.toLocaleString()}
                        </p>
                    </div>

                    <div className="mt-8 border-t border-amber-900/30 pt-4">
                        <h3 className="text-amber-700 font-serif font-bold text-lg mb-2">Descripción Arcano</h3>
                        <p className="text-slate-300">
                          
                            El Tomo contiene los secretos del {juego.nombre}. Publicado en {juego.year} por la editorial {juego.editorial}. Es un manual esencial para cualquier {juego.categoria}.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JuegosDetalle;
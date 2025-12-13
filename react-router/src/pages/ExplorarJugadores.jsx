//Archivo: react-router/src/pages/ExplorarJugadores.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getJugadoresPublicos } from '../services/jugadores.services'; 

/**
 * Página: La Taberna (Lista de Jugadores)
 * Muestra un listado de todos los miembros del Club.
 * ACTUALIZADO: Las tarjetas ahora son enlaces al perfil público.
 */
const ExplorarJugadores = () => {
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCanceled = false;
        
        const loadData = async () => {
            try {
                const data = await getJugadoresPublicos();
                if (!isCanceled) {
                    setJugadores(data); 
                }
            } catch (err) {
                if (!isCanceled) {
                    setError(err.message);
                }
            } finally {
                if (!isCanceled) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => { isCanceled = true };
    }, []);

    // --- ESTADOS DE CARGA/ERROR ---
    if (loading) return <div className="text-amber-500 text-center p-10 animate-pulse">Buscando héroes en la taberna...</div>;
    if (error) return <div className="text-red-400 text-center p-10">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-amber-500 font-serif mb-6 border-b border-amber-900/30 pb-4">
                👥 La Taberna
            </h1>
            <p className="text-slate-400 mb-8 italic">Conoce a los miembros del club y revisa sus hojas de personaje.</p>

            {jugadores.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700">
                    <p className="text-slate-500 text-lg font-serif">Nadie está en línea en la taberna.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {jugadores.map(jugador => (
                        <Link 
                            to={`/jugadores/${jugador._id}`} // <--- ENLACE AL PERFIL PÚBLICO
                            key={jugador._id} 
                            className="group block bg-slate-900 border border-amber-800/30 p-6 rounded-xl shadow-xl text-center transform hover:scale-[1.02] hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-amber-900/40 border-2 border-amber-700/50 flex items-center justify-center text-3xl font-serif text-amber-300 mx-auto mb-4 shadow-inner group-hover:border-amber-400 transition-colors">
                                {jugador.nombre ? jugador.nombre[0].toUpperCase() : '?'}
                            </div>
                            
                            {/* Datos */}
                            <h3 className="text-lg font-bold text-amber-500 font-serif group-hover:text-amber-300 transition-colors">
                                {jugador.nombre}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4 truncate">{jugador.email}</p>
                            
                            {/* Call to Action (visible en hover) */}
                            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Ver Hoja de Personaje →
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExplorarJugadores;
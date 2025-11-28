//Archivo: react-router/src/pages/ExplorarCampanas.jsx
import React from 'react'
import { Link } from 'react-router-dom';
import { useCampanasPublicas } from '../hooks/useCampanas' 

/**
 * Página: Mundo Abierto (Campañas Públicas)
 */
const ExplorarCampanas = () => {
    
    const { campanas, loading, error } = useCampanasPublicas() 
    const listaSegura = Array.isArray(campanas) ? campanas : []

    if (loading) return <div className="text-amber-500 text-center p-10">Buscando aventuras en el horizonte...</div>
    if (error) return <div className="text-red-400 text-center p-10">Error al contactar con el oráculo: {error}</div>

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-amber-500 font-serif mb-6 border-b border-amber-900/30 pb-4">
                🌍 Mundo Abierto
            </h1>
            <p className="text-slate-400 mb-8 italic">Explora las crónicas de aventuras activas de otros Dungeon Masters.</p>

            {listaSegura.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700">
                    <p className="text-slate-500 text-lg font-serif">Nadie ha iniciado una aventura pública aún.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listaSegura.map(campana => (
                        <div
                            key={campana._id}
                            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-600/50 transition-all group flex flex-col h-full transform hover:-translate-y-1"
                        >
                            {/* PORTADA */}
                            <div className="h-48 bg-slate-950 relative overflow-hidden">
                                {campana.imagen ? (
                                    <img
                                        src={campana.imagen}
                                        alt={campana.titulo}
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1642479634795-364234027725?q=80&w=2070&auto=format&fit=crop"; }}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 text-slate-600">
                                        <svg className="w-16 h-16 opacity-30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        <span className="text-xs uppercase tracking-widest font-bold opacity-50">Sin Portada</span>
                                    </div>
                                )}

                                <div className="absolute top-3 right-3">
                                    <span className="bg-slate-900/90 backdrop-blur text-amber-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-amber-900/50 shadow-sm">
                                        {campana.sistema}
                                    </span>
                                </div>
                            </div>

                            {/* CONTENIDO */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-amber-50 mb-2 truncate font-serif group-hover:text-amber-400 transition-colors">
                                    {campana.titulo}
                                </h2>

                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {campana.descripcion || "Sin descripción registrada por el master..."}
                                </p>

                                <Link
                                    to={`/campanas/${campana._id}`}
                                    className="block w-full text-center py-2.5 bg-slate-800 hover:bg-amber-900/30 text-amber-500 border border-slate-700 hover:border-amber-700/50 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h-6m-4 0h16" /></svg>
                                    Ver Detalle
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExplorarCampanas;
import React from 'react'
import { Link } from 'react-router-dom'
import { useCampanas } from '../hooks/useCampanas'
import Activity from '../components/Activity'

const MisCampanas = () => {
    const { campanas, loading, error } = useCampanas()

    if (loading) return <div className="p-10 text-center text-gold-500 animate-pulse">Cargando crónicas...</div>
    if (error) return <div className="p-10 text-center text-red-400 border border-red-900 bg-red-900/20 rounded">Error: {error}</div>

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-8 border-b border-gold-600/30 pb-4">
                <h1 className="text-3xl font-bold text-gold-500 font-serif">Mis Campañas</h1>
                <Link
                    to="/campanas/nueva"
                    className="px-4 py-2 bg-gold-600 text-dungeon-dark font-bold rounded hover:bg-gold-500 transition shadow-lg flex items-center gap-2"
                >
                    <span>+</span> Nueva Aventura
                </Link>
            </div>

            {(!campanas || campanas.length === 0) ? (
                <div className="text-center py-16 bg-dungeon-light rounded-lg border border-dashed border-gray-700">
                    <p className="text-xl text-gray-400 mb-3">Tu grimorio está vacío.</p>
                    <Link to="/campanas/nueva" className="text-gold-500 hover:underline">Inicia tu primera campaña</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campanas.map(campana => (
                        <div
                            key={campana._id}
                            className="bg-dungeon-light border border-gold-600/20 rounded-lg overflow-hidden shadow-lg hover:shadow-gold-500/10 hover:border-gold-600/50 transition-all group"
                        >

                            {/* PORTADA */}
                            <div className="h-32 bg-slate-800 relative overflow-hidden">
                                {campana.imagen ? (
                                    <img
                                        src={campana.imagen}
                                        alt={campana.titulo}
                                        onError={(e) => e.target.src = "/fallback.jpg"}   // ← FIX
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-slate-600">🏰</div>
                                )}

                                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-gold-400 border border-gold-600/30 backdrop-blur-sm">
                                    {campana.sistema}
                                </div>
                            </div>

                            {/* CONTENIDO */}
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-gold-500 mb-2 truncate font-serif">
                                    {campana.titulo}
                                </h2>

                                <p className="text-gray-400 text-sm line-clamp-2 mb-4 min-h-[2.5rem]">
                                    {campana.descripcion || "Sin descripción..."}
                                </p>

                                <Link
                                    to={`/campanas/${campana._id}`}
                                    className="block w-full text-center py-2 bg-slate-800 hover:bg-slate-700 text-gold-500 text-sm font-bold rounded border border-gray-700 transition-colors"
                                >
                                    Gestionar Campaña
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MisCampanas

import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCampana } from '../hooks/useCampanas'

const DetalleCampana = () => {
    const { id } = useParams()
    const { campana, loading, error } = useCampana(id)

    if (loading) return <div className="p-10 text-center text-gold-500 animate-pulse">Descifrando pergaminos...</div>
    if (error) return <div className="p-10 text-center text-red-400">Error: {error}</div>
    if (!campana || !campana._id) return <div className="p-10 text-center text-gray-500">Campaña no encontrada en los archivos.</div>

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link to="/campanas" className="text-gray-400 hover:text-gold-500 mb-6 inline-flex items-center gap-2 transition-colors">
                <span>&larr;</span> Volver a mis campañas
            </Link>
            
            <div className="bg-dungeon-light border border-gold-600/30 rounded-lg overflow-hidden shadow-2xl">
                
                <div className="p-8 border-b border-gold-600/20 relative bg-slate-800/50">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 relative z-10">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gold-500 font-serif mb-2">{campana.titulo}</h1>
                            <span className="inline-block bg-gold-600 text-dungeon-dark px-3 py-1 rounded font-bold text-sm shadow-lg">
                                {campana.sistema}
                            </span>
                        </div>

                        <div className="text-left md:text-right text-sm text-gray-500 bg-dungeon-dark/80 p-2 rounded border border-gray-700">
                            <p className="text-xs uppercase tracking-widest mb-1">Fecha de Creación</p>
                            <p className="text-gray-300 font-mono">
                                {campana.fecha_creacion
                                    ? new Date(campana.fecha_creacion).toLocaleDateString()
                                    : "Fecha no registrada"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <h3 className="text-sm font-bold text-gold-500/70 mb-3 uppercase tracking-wider border-b border-gray-700 pb-1 w-max">Descripción</h3>
                    <div className="text-parchment text-lg leading-relaxed whitespace-pre-line bg-dungeon-dark/30 p-4 rounded border border-gray-700/50">
                        {campana.descripcion || "Sin descripción registrada."}
                    </div>
                </div>

                <div className="bg-dungeon-dark/50 p-8 border-t border-gold-600/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gold-500 font-serif flex items-center gap-2">
                            📜 Diario de Aventuras
                        </h2>
                        <button className="text-sm bg-slate-800 hover:bg-slate-700 text-gray-300 px-3 py-2 rounded border border-gray-600 transition-colors cursor-not-allowed opacity-50" disabled>
                            + Nueva Partida
                        </button>
                    </div>
                    
                    <div className="text-center py-10 border-2 border-dashed border-gray-700 rounded-lg text-gray-500 italic">
                        Aún no se han registrado sesiones en esta campaña.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleCampana

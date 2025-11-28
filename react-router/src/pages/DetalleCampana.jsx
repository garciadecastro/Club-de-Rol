//Archivo: react-router/src/pages/DetalleCampana.jsx
import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom' 
import { useCampana } from '../hooks/useCampanas'
import { deleteCampana } from '../services/campanas.services' 
import { useJuegos } from '../hooks/useJuegos' 

/**
 * Página de Detalle de una Campaña específica.
 */
const DetalleCampana = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { campana, loading, error } = useCampana(id)
    const { juegos } = useJuegos()

    // Lógica para encontrar el juego asociado (si existe), tengo que trabajar más para el final esta parte
    const juegoAsociado = campana.juegoAsociado ? juegos.find(j => j._id === campana.juegoAsociado) : null;


    // --- FUNCIÓN DE ELIMINACIÓN ---
    const handleDelete = async () => {
        if (!confirm(`⚠️ ¿Deseas archivar la campaña "${campana.titulo}"? Esta es una acción irreversible (Soft Delete).`)) return;
        
        try {
            await deleteCampana(id); // Llama al servicio de borrado lógico
            alert(`Campaña "${campana.titulo}" archivada con éxito.`);
            navigate("/campanas"); // Redirige a la lista de campañas
        } catch (err) {
            alert(`Error al archivar la campaña: ${err.message}`);
        }
    }


    // --- ESTADOS DE CARGA CON ESTILO ---
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-amber-500 animate-pulse gap-4">
            <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-serif text-xl tracking-widest">Descifrando pergaminos...</span>
        </div>
    )

    if (error) return (
        <div className="p-8 text-center bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-2">Error Arcano</h2>
            <p>{error}</p>
        </div>
    )

    if (!campana || !campana._id) return (
        <div className="p-10 text-center text-slate-500 italic font-serif text-xl">
            La campaña que buscas se ha perdido en el tiempo.
        </div>
    )

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">
            
            {/* BOTÓN VOLVER */}
            <Link to="/campanas" className="group text-slate-400 hover:text-amber-400 mb-8 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver al mapa</span>
            </Link>
            
            {/* TARJETA PRINCIPAL */}
            <div className="bg-slate-900 border border-amber-800/40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                
                {/* CABECERA: Título, Metadatos y ACCIONES CRUD */}
                <div className="relative p-8 md:p-10 border-b border-amber-900/30">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-amber-900/40 text-amber-300 border border-amber-700/50 rounded text-xs font-bold uppercase tracking-wider shadow-inner">
                                    {campana.sistema}
                                </span>
                                {campana.fecha_creacion && (
                                    <span className="text-xs text-slate-500 font-mono">
                                        Creada el {new Date(campana.fecha_creacion).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            
                            {/* Título */}
                            <h1 className="text-4xl md:text-5xl font-bold text-amber-500 font-serif tracking-tight drop-shadow-sm">
                                {campana.titulo}
                            </h1>
                            
                            {/* Juego Asociado */}
                            {juegoAsociado && (
                                <p className="text-sm mt-3 text-slate-300">
                                    **Juego Asociado:** <Link to={`/juegos/editar/${juegoAsociado._id}`} className="text-amber-400 hover:underline">{juegoAsociado.nombre}</Link>
                                </p>
                            )}

                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div className="flex flex-col gap-2 items-end">
                            {/* Botón Editar */}
                            <Link 
                                to={`/campanas/editar/${id}`} 
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg border border-amber-900/50 transition-all text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                Editar Campaña
                            </Link>

                            {/* Botón Eliminar */}
                            <button 
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-800/50 text-red-400 font-bold rounded-lg border border-red-900 transition-all text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Archivar
                            </button>
                        </div>
                    </div>
                </div>

                {/* CONTENIDO: Descripción */}
                <div className="p-8 md:p-10 bg-slate-950/30">
                    <h3 className="text-amber-700 font-serif font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="h-px w-8 bg-amber-800/50"></span>
                        Prólogo / Descripción
                        <span className="h-px flex-1 bg-amber-800/50"></span>
                    </h3>
                    
                    <div className="text-amber-50/80 text-lg leading-relaxed whitespace-pre-line font-serif pl-4 border-l-2 border-amber-900/50">
                        {campana.descripcion || "El Dungeon Master aún no ha escrito la historia de esta aventura..."}
                    </div>
                </div>

                {/* SECCIÓN MIEMBROS */}
                <div className="bg-slate-950 p-8 md:p-10 border-t border-amber-900/30">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-amber-500 font-serif flex items-center gap-3">
                            🛡️ Miembros de la Campaña
                        </h2>
                        
                        <button 
                            onClick={() => alert("El cuervo mensajero ha sido enviado. (Funcionalidad simulada)")}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-lg shadow-lg shadow-amber-900/20 border border-amber-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                            Invitar Aventurero
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        
                        {/* Tarjeta del DM */}
                        <div className="flex items-center gap-4 p-4 bg-slate-900 border border-amber-800/30 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-600/50 flex items-center justify-center text-2xl">
                                👑
                            </div>
                            <div>
                                <p className="text-amber-100 font-bold">Dungeon Master</p>
                                <p className="text-xs text-amber-500 uppercase tracking-wider">Creador</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-800 rounded-lg text-slate-600 italic text-sm min-h-[80px]">
                            Esperando que los héroes respondan a la llamada...
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetalleCampana
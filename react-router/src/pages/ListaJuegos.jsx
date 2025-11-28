//Archivo: react-router/src/pages/ListaJuegos.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useJuegos } from '../hooks/useJuegos'
import { deleteJuego } from '../services/juegos.services'

/**
 * Página: Biblioteca de Juegos (ListaJuegos)
 */
const ListaJuegos = () => {
    const { juegos, loading, error } = useJuegos()
   
    
    // Función para manejar la eliminación del juego
    const handleDelete = async (id, nombre) => {
        if (!confirm(`¿Estás seguro de archivar el tomo "${nombre}"? (Borrado Lógico)`)) return;
        
        try {
            await deleteJuego(id);
            alert(`Tomo '${nombre}' archivado con éxito.`);
            // Forzar recarga suave de la página para actualizar el listado
            window.location.reload(); 
        } catch (error) {
            alert(`Error al eliminar: ${error.message}`);
        }
    }

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-amber-500 animate-pulse gap-4">
                <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-serif text-xl tracking-widest uppercase">Consultando la biblioteca...</span>
            </div>
        )
    }

    // --- ERROR STATE ---
    if (error) {
        return (
            <div className="p-8 text-center bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 max-w-2xl mx-auto mt-10">
                <h2 className="text-xl font-bold mb-2">Biblioteca Clausurada</h2>
                <p>Error: {error}</p>
            </div>
        )
    }

    const listaSegura = Array.isArray(juegos) ? juegos : []

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
            
            {/* --- CABECERA --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-amber-900/30 pb-4 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-amber-500 font-serif tracking-tight drop-shadow-sm">
                        Compendio de Juegos
                    </h1>
                    <p className="text-slate-400 mt-2 font-serif italic">
                        Manuales, reglamentos y tomos disponibles para tus aventuras.
                    </p>
                </div>
                
                <Link
                    to="/juegos/nuevo"
                    className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg shadow-lg hover:shadow-amber-900/40 hover:from-amber-600 hover:to-amber-500 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 border border-amber-500/30"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Añadir Tomo
                </Link>
            </div>
            
            {/* --- EMPTY STATE --- */}
            {listaSegura.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700">
                    <p className="text-slate-500 text-lg font-serif">La biblioteca está vacía por el momento.</p>
                </div>
            ) : (
                /* --- GRID DE JUEGOS --- */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listaSegura.map(juego => (
                        <div 
                            key={juego._id}
                            className="group relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-600/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                        >
                            {/* IMAGEN Y BADGE */}
                            <div className="relative h-48 overflow-hidden bg-slate-950">
                                {juego.imagen ? (
                                    <img 
                                        src={juego.imagen} 
                                        alt={juego.nombre}
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1642479634795-364234027725?q=80&w=2070&auto=format&fit=crop"; }}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700 text-4xl">🎲</div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className="bg-slate-900/90 backdrop-blur text-amber-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-amber-900/50 shadow-sm">
                                        {juego.categoria || "Varios"}
                                    </span>
                                </div>
                            </div>

                            {/* DETALLES Y ACCIONES */}
                            <div className="p-5 flex flex-col flex-grow relative">
                                <h3 className="font-bold text-xl text-amber-50 font-serif leading-tight mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                                    {juego.nombre}
                                </h3>

                                <div className="flex justify-between items-center text-xs text-slate-400 mb-4 border-b border-slate-800 pb-3">
                                    <span className="italic truncate pr-2">{juego.editorial || "Indie"}</span>
                                    <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{juego.year || "N/A"}</span>
                                </div>

                                {/* ACCIONES CRUD EN EL FOOTER */}
                                <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-800">
                                    <span className="text-lg font-bold text-amber-500 font-serif">
                                        {juego.precio ? `$${juego.precio.toLocaleString()}` : "Gratis"}
                                    </span>

                                    <div className="flex gap-2">
                                        {/* Botón Editar */}
                                        <Link 
                                            to={`/juegos/editar/${juego._id}`}
                                            className="text-amber-400 hover:text-amber-300 p-2 rounded-full hover:bg-amber-900/30 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </Link>

                                        {/* Botón Eliminar */}
                                        <button 
                                            onClick={() => handleDelete(juego._id, juego.nombre)}
                                            className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-900/30 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListaJuegos
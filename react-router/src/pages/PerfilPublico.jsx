//Archivo: react-router/src/pages/PerfilPublico.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJugadorById } from '../services/jugadores.services'

/**
 * Página: Perfil Público (Hoja de Aventurero)
 * Muestra los detalles de un jugador específico para que otros lo vean.
 */
const PerfilPublico = () => {
    const { id } = useParams()
    const [jugador, setJugador] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true;

        getJugadorById(id)
            .then(data => {
                if (isMounted) setJugador(data)
            })
            .catch(err => {
                if (isMounted) setError(err.message)
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => { isMounted = false }
    }, [id])

    // --- RENDER: CARGANDO ---
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-amber-500 animate-pulse gap-4">
            <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span className="font-serif text-xl tracking-widest">Invocando al espíritu del aventurero...</span>
        </div>
    )

    // --- RENDER: ERROR ---
    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-fade-in">
            <div className="text-6xl">🪦</div>
            <div>
                <h2 className="text-3xl font-bold text-red-400 font-serif mb-2">Tumba Vacía</h2>
                <p className="text-slate-400">No hemos encontrado registros de este aventurero.</p>
                <p className="text-slate-500 text-sm mt-1">({error})</p>
            </div>
            <Link to="/explorar/jugadores" className="px-6 py-2 border border-amber-600 text-amber-500 rounded hover:bg-amber-900/30 transition-colors">
                Volver a la Taberna
            </Link>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
            
            {/* NAVEGACIÓN */}
            <Link to="/explorar/jugadores" className="group text-slate-400 hover:text-amber-400 mb-8 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver a La Taberna</span>
            </Link>

            {/* TARJETA PRINCIPAL (HOJA DE PERSONAJE) */}
            <div className="bg-slate-900 border-2 border-amber-800/40 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
                
                {/* Decoración de fondo */}
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-amber-900 via-amber-500 to-amber-900"></div>

                <div className="flex flex-col md:flex-row">
                    
                    {/* COLUMNA IZQUIERDA: IDENTIDAD */}
                    <div className="md:w-1/3 p-8 bg-slate-950/80 border-b md:border-b-0 md:border-r border-amber-800/30 flex flex-col items-center text-center relative overflow-hidden">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-amber-700/50 flex items-center justify-center text-5xl font-serif text-amber-500 mb-6 shadow-2xl z-10">
                            {jugador.nombre ? jugador.nombre[0].toUpperCase() : '?'}
                        </div>
                        
                        <h1 className="text-3xl font-bold text-amber-100 font-serif mb-1 z-10 relative">
                            {jugador.nombre}
                        </h1>
                        <p className="text-amber-600 font-bold text-xs tracking-[0.2em] uppercase mb-8 z-10">
                            Aventurero del Club
                        </p>

                        {/* Datos de contacto (Tarjeta) */}
                        <div className="w-full bg-slate-900/50 rounded-lg p-4 border border-slate-800 z-10">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Cuervo Mensajero (Email)</p>
                            <p className="text-slate-300 text-sm truncate select-all">{jugador.email}</p>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: DETALLES Y ESTADÍSTICAS */}
                    <div className="md:w-2/3 p-8 bg-slate-900">
                        
                        {/* Sección 1: Estadísticas (Simuladas por ahora) */}
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-amber-500 font-serif mb-4 flex items-center gap-3 border-b border-amber-900/30 pb-2">
                                <span className="text-xl">📊</span> Estadísticas de Rol
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-slate-200">1</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Nivel de Cuenta</span>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center opacity-50" title="Próximamente">
                                    <span className="text-3xl font-bold text-slate-200">?</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Campañas Activas</span>
                                </div>
                            </div>
                        </div>

                        {/* Sección 2: Biografía / Estado */}
                        <div>
                            <h2 className="text-lg font-bold text-amber-500 font-serif mb-4 flex items-center gap-3 border-b border-amber-900/30 pb-2">
                                <span className="text-xl">📜</span> Historia
                            </h2>
                            <div className="text-slate-400 italic bg-slate-950/30 p-6 rounded border-l-2 border-amber-700/50">
                                "Este aventurero aún está escribiendo su leyenda. Sus hazañas son desconocidas para los bardos locales..."
                            </div>
                        </div>

                        {/* Footer decorativo */}
                        <div className="mt-12 text-center">
                            <p className="text-xs text-slate-600 font-serif">
                                ~ Miembro oficial del Club de Rol ~
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfilPublico
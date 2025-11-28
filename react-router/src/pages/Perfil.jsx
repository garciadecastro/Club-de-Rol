//Archivo: react-router/src/pages/Perfil.jsx
import React from "react"
import { Link } from "react-router-dom"
import { useUsuario } from "../contexts/SessionContext"

/**
 * Página: Mi Perfil (Dashboard del Usuario)
 */
const Perfil = () => {
    const user = useUsuario()

    // Loading State
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-amber-500 animate-pulse gap-4">
                <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24"><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span className="font-serif text-xl tracking-widest uppercase">Invocando perfil...</span>
            </div>
        )
    }

    // Iniciales para el avatar
    const iniciales = user.nombre ? user.nombre.split(" ").map(w => w[0]).join("").toUpperCase() : "?"

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">

            {/* --- CABECERA (RESUMEN DE PERSONAJE) --- */}
            <div className="bg-slate-900 border border-amber-800/40 rounded-xl p-8 shadow-2xl mb-10 relative overflow-hidden">
                {/* Fondo decorativo sutil */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                    
                    {/* Avatar Grande */}
                    <div className="w-24 h-24 rounded-full bg-slate-950 border-2 border-amber-600 shadow-lg flex items-center justify-center text-4xl font-bold text-amber-500 font-serif">
                        {iniciales}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-amber-500 font-serif mb-1 tracking-tight">
                            {user.nombre}
                        </h1>
                        <p className="text-slate-400 text-sm font-mono mb-4 bg-slate-950/50 inline-block px-3 py-1 rounded border border-slate-800">
                            {user.email}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-amber-900/20 text-amber-300 border border-amber-800/30 rounded text-xs font-bold uppercase tracking-wider">
                                Nivel 1
                            </span>
                            <span className="px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded text-xs font-bold uppercase tracking-wider">
                                Aventurero
                            </span>
                        </div>
                    </div>

                    {/* Botón de Acción */}
                    <Link
                        to="/perfil/editar"
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-amber-500 border border-amber-900/50 rounded-lg transition-all shadow-md text-sm font-bold flex items-center gap-2 group"
                    >
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        Editar Hoja
                    </Link>
                </div>
            </div>

            {/* --- GRID DE ACCIONES (ACCESOS RÁPIDOS) --- */}
            <h2 className="text-2xl font-bold text-amber-500 font-serif mb-6 border-b border-amber-900/30 pb-2">
                Acciones del Jugador
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Mis Campañas */}
                <Link to="/campanas" className="group block bg-slate-900 border border-slate-700 hover:border-amber-600/50 rounded-xl p-6 shadow-lg transition-all transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-amber-900/20 rounded-lg text-amber-500 group-hover:text-amber-400 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <span className="text-slate-500 group-hover:text-amber-500 transition-colors">&rarr;</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-amber-400 transition-colors font-serif mb-2">
                        Mis Campañas
                    </h3>
                    <p className="text-slate-400 text-sm">Gestiona tus aventuras activas o revisa el historial de tus partidas pasadas.</p>
                </Link>

                {/* 2. Crear Campaña */}
                <Link to="/campanas/nueva" className="group block bg-slate-900 border border-slate-700 hover:border-amber-600/50 rounded-xl p-6 shadow-lg transition-all transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-indigo-900/20 rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <span className="text-slate-500 group-hover:text-indigo-400 transition-colors">&rarr;</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-indigo-300 transition-colors font-serif mb-2">
                        Nueva Aventura
                    </h3>
                    <p className="text-slate-400 text-sm">Inicia una nueva campaña como Dungeon Master. Tú escribes el destino.</p>
                </Link>

                {/* 3. Biblioteca */}
                <Link to="/juegos" className="group block bg-slate-900 border border-slate-700 hover:border-amber-600/50 rounded-xl p-6 shadow-lg transition-all transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-emerald-900/20 rounded-lg text-emerald-500 group-hover:text-emerald-400 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">&rarr;</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-emerald-300 transition-colors font-serif mb-2">
                        Biblioteca de Juegos
                    </h3>
                    <p className="text-slate-400 text-sm">Consulta manuales y sistemas de reglas disponibles en el club.</p>
                </Link>

                {/* 4. Comunidad (Explorar Jugadores) */}
                <Link to="/explorar/jugadores" className="group block bg-slate-900 border border-slate-700 hover:border-amber-600/50 rounded-xl p-6 shadow-lg transition-all transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-purple-900/20 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <span className="text-slate-500 group-hover:text-purple-400 transition-colors">&rarr;</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-purple-300 transition-colors font-serif mb-2">
                        La Taberna (Jugadores)
                    </h3>
                    <p className="text-slate-400 text-sm">Encuentra compañeros de aventura y revisa los perfiles de otros miembros.</p>
                </Link>

            </div>

        </div>
    )
}

export default Perfil
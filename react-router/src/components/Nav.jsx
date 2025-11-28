//Archivo: react-router/src/components/Nav.jsx
import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useUsuario } from "../contexts/SessionContext"

const Nav = () => {
    const usuario = useUsuario()
    const location = useLocation()
    const [open, setOpen] = useState(false)

    // Cierra el menú desplegable al cambiar de ruta
    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    // Helper para marcar el enlace activo con un brillo dorado
    const isActive = (path) =>
        location.pathname.startsWith(path)
            ? "text-amber-400 border-b-2 border-amber-500 pb-1"
            : "text-slate-300 hover:text-amber-200 hover:border-b-2 hover:border-amber-500/50 pb-1 transition-all"

    // Iniciales del usuario para el avatar
    const iniciales = usuario?.nombre
        ? usuario.nombre.split(" ").map(w => w[0]).join("").toUpperCase()
        : "?"

    return (
      
        <nav className='bg-slate-950 border-b border-amber-900/50 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-20'>

                    {/* --- LOGO Y MARCA --- */}
                    <Link to={usuario ? "/campanas" : "/"} className='flex items-center gap-3 group'>
                        {/* Icono D20 estilizado */}
                        <div className="relative">
                            <svg width="32" height="32" viewBox="0 0 24 24"
                                className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300"
                                fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="3 7 12 2 21 7 21 17 12 22 3 17"></polygon>
                                <line x1="3" y1="7" x2="21" y2="17"></line>
                                <line x1="21" y1="7" x2="3" y2="17"></line>
                                <line x1="12" y1="2" x2="12" y2="22"></line>
                            </svg>
                        </div>
                        
                        <span className="text-2xl font-bold font-serif text-amber-50 tracking-wider group-hover:text-amber-400 transition-colors">
                            Club de Rol
                        </span>
                    </Link>

                    {/* --- ENLACES DE NAVEGACIÓN (SOLO USUARIOS LOGUEADOS) --- */}
                    {usuario && (
                        <div className='hidden lg:flex items-center gap-6 text-base font-medium font-serif tracking-wide'>
                            {/* Mis Campañas */}
                            <Link to="/campanas" className={isActive("/campanas")}>
                                📜 Mis Aventuras
                            </Link>

                            {/* Biblioteca de Juegos */}
                            <Link to="/juegos" className={isActive("/juegos")}>
                                📚 Biblioteca
                            </Link>
                            
                            {/* Ver todas las campañas activas */}
                            <Link to="/explorar/campanas" className={isActive("/explorar/campanas")}>
                                🌍 Mundo Abierto
                            </Link>

                            {/* Ver todos los jugadores */}
                            <Link to="/explorar/jugadores" className={isActive("/explorar/jugadores")}>
                                👥 La Taberna
                            </Link>
                        </div>
                    )}

                    <div className="relative">

                        {/* ESTADO: NO LOGUEADO */}
                        {!usuario && (
                            <div className='flex items-center gap-6 text-sm font-serif'>
                                <Link className='text-amber-100/80 hover:text-amber-400 transition-colors uppercase tracking-widest text-xs' to="/login">
                                    Iniciar Sesión
                                </Link>
                                <Link className='px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded border border-amber-500 hover:from-amber-600 hover:to-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5' to="/registro">
                                    Únete al Gremio
                                </Link>
                            </div>
                        )}

                        {/* ESTADO: LOGUEADO */}
                        {usuario && (
                            <div className="flex items-center gap-4">
                                <span className="hidden xl:block text-amber-100/60 text-sm italic font-serif">
                                    Bienvenido, {usuario.nombre}
                                </span>
                                
                                <div className="relative">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="w-12 h-12 rounded-full bg-slate-900 border-2 border-amber-700 text-amber-500 font-bold font-serif text-lg flex items-center justify-center hover:border-amber-400 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all"
                                    >
                                        {iniciales}
                                    </button>

                                    {/* --- MENÚ DESPLEGABLE DEL AVATAR --- */}
                                    {open && (
                                        <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-amber-800 rounded-md shadow-2xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5 animate-fade-in">
                                            
                                            <div className="px-4 py-3 border-b border-amber-900/50 bg-slate-950">
                                                <p className="text-sm text-amber-500 font-bold">Cuenta de Aventurero</p>
                                                <p className="text-xs text-slate-400 truncate">{usuario.email}</p>
                                            </div>

                                            <div className="py-1">
                                                <Link className="block px-4 py-2 text-sm text-slate-300 hover:bg-amber-900/20 hover:text-amber-400 transition-colors" to="/perfil">
                                                    🧝 Hoja de Personaje (Perfil)
                                                </Link>
                                                
                                                <Link className="block px-4 py-2 text-sm text-slate-300 hover:bg-amber-900/20 hover:text-amber-400 transition-colors" to="/campanas">
                                                    📜 Mis Campañas
                                                </Link>
                                            </div>

                                            <div className="border-t border-amber-900/50 py-1 bg-slate-950/50">
                                                <Link className="block px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors" to="/logout">
                                                    🚪 Cerrar Sesión
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
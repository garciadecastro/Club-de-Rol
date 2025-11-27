import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useUsuario } from "../contexts/SessionContext"

const Nav = () => {

    const usuario = useUsuario()
    const location = useLocation()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    const isActive = (path) =>
        location.pathname.startsWith(path)
            ? "text-gold-500"
            : "text-parchment hover:text-gold-500"

    const iniciales = usuario?.nombre
        ? usuario.nombre.split(" ").map(w => w[0]).join("").toUpperCase()
        : "?"

    return (
        <nav className='bg-dungeon-light border-b border-gold-600/30 shadow-lg sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>

                    {/* LOGO */}
                    <Link to={usuario ? "/campanas" : "/"} className='flex items-center gap-2'>
                        <svg width="28" height="28" viewBox="0 0 24 24"
                            className="text-gold-500 drop-shadow"
                            fill="none" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="3 7 12 2 21 7 21 17 12 22 3 17"></polygon>
                            <line x1="3" y1="7" x2="21" y2="17"></line>
                            <line x1="21" y1="7" x2="3" y2="17"></line>
                            <line x1="12" y1="2" x2="12" y2="22"></line>
                        </svg>

                        <span className="text-xl font-bold font-cinzel text-gold-500">
                            Club de Rol
                        </span>
                    </Link>

                    {/* --- ENLACES CENTRALES SOLO SI LOGUEADO --- */}
                    {usuario && (
                        <div className='hidden md:flex items-center gap-6 text-sm font-medium'>
                            <Link to="/campanas" className={`${isActive("/campanas")} transition-colors`}>
                                📜 Mis Campañas
                            </Link>

                            <Link to="/juegos" className={`${isActive("/juegos")} transition-colors`}>
                                📚 Biblioteca
                            </Link>
                        </div>
                    )}

                    {/* DERECHA */}
                    <div className="relative">

                        {/* SIN SESIÓN */}
                        {!usuario && (
                            <div className='flex items-center gap-4 text-sm'>
                                <Link className='text-parchment hover:text-gold-500 transition-colors' to="/login">
                                    Iniciar Sesión
                                </Link>
                                <Link className='px-4 py-2 bg-gold-600 text-dungeon-dark font-bold rounded hover:bg-gold-500 transition-colors' to="/registro">
                                    Registro
                                </Link>
                            </div>
                        )}

                        {/* CON SESIÓN */}
                        {usuario && (
                            <div>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-gold-600/40 text-gold-500 font-bold flex items-center justify-center hover:border-gold-500 transition"
                                >
                                    {iniciales}
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-dungeon-light border border-gold-600/30 rounded shadow-xl z-50">

                                        <Link
                                            className="block px-4 py-2 text-sm text-parchment hover:bg-slate-900/50"
                                            to="/perfil"
                                        >
                                            🧝 Mi Perfil
                                        </Link>

                                        <Link
                                            className="block px-4 py-2 text-sm text-parchment hover:bg-slate-900/50"
                                            to="/campanas"
                                        >
                                            📜 Mis Campañas
                                        </Link>

                                        <Link
                                            className="block px-4 py-2 text-sm text-parchment hover:bg-slate-900/50"
                                            to="/juegos"
                                        >
                                            🎲 Biblioteca
                                        </Link>

                                        <Link
                                            className="block px-4 py-2 text-sm text-red-400 hover:bg-red-900/30"
                                            to="/logout"
                                        >
                                            🚪 Salir
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav

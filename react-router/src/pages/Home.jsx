//Archivo: react-router/src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center text-center px-4 py-20 font-sans">
            
            {/* --- FONDO ATMOSFÉRICO (Efecto de luz de antorcha) --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px]" />
            </div>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
                
                {/* ICONO D20 HEROICO */}
                <div className="mb-8 flex justify-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <svg className="relative w-24 h-24 text-amber-500 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" 
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 7l10 5 10-5M2 7v10l10 5 10-5V7z" />
                        </svg>
                    </div>
                </div>

                {/* TÍTULO */}
                <h1 className="text-6xl md:text-8xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-600 mb-6 drop-shadow-sm tracking-tight">
                    El Club de Rol
                </h1>

                {/* SUBTÍTULO */}
                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-serif italic leading-relaxed">
                    "Donde las historias cobran vida y los dados deciden el destino."
                    <br/>
                    <span className="text-base text-slate-500 not-italic mt-2 block font-sans">
                        Gestiona tus campañas, organiza partidas y consulta tu biblioteca en un entorno diseñado para verdaderos Amos del Calabozo.
                    </span>
                </p>
                
                {/* BOTONES DE ACCIÓN (CTA) */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                    <Link 
                        to="/login"
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(180,83,9,0.4)] hover:shadow-[0_0_30px_rgba(180,83,9,0.6)] hover:from-amber-600 hover:to-amber-500 transition-all transform hover:-translate-y-1 border border-amber-500/50"
                    >
                        🗝️ Entrar al Calabozo
                    </Link>

                    <Link 
                        to="/registro"
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-amber-700/50 text-amber-500 font-bold text-lg rounded-lg hover:bg-amber-900/10 hover:border-amber-500 transition-all transform hover:-translate-y-1"
                    >
                        📜 Firmar Contrato (Registro)
                    </Link>
                </div>

                {/* --- SECCIÓN DE CARACTERÍSTICAS (GRID) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    
                    {/* Tarjeta 1 */}
                    <div className="p-6 bg-slate-900/50 border border-amber-900/30 rounded-xl backdrop-blur-sm hover:border-amber-700/50 transition-colors">
                        <div className="text-3xl mb-3">🛡️</div>
                        <h3 className="text-amber-100 font-bold text-lg mb-2 font-serif">Gestión de Campañas</h3>
                        <p className="text-slate-400 text-sm">Crea mundos, invita jugadores y mantén un registro de tus aventuras épicas.</p>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="p-6 bg-slate-900/50 border border-amber-900/30 rounded-xl backdrop-blur-sm hover:border-amber-700/50 transition-colors">
                        <div className="text-3xl mb-3">🎲</div>
                        <h3 className="text-amber-100 font-bold text-lg mb-2 font-serif">Biblioteca de Juegos</h3>
                        <p className="text-slate-400 text-sm">Consulta manuales, sistemas de reglas y asigna juegos a tus partidas.</p>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="p-6 bg-slate-900/50 border border-amber-900/30 rounded-xl backdrop-blur-sm hover:border-amber-700/50 transition-colors">
                        <div className="text-3xl mb-3">🔥</div>
                        <h3 className="text-amber-100 font-bold text-lg mb-2 font-serif">Comunidad Activa</h3>
                        <p className="text-slate-400 text-sm">Únete a mesas abiertas, encuentra nuevos compañeros y comparte tus historias.</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home
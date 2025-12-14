//Archivo: react-router/src/pages/RecuperarCuenta.jsx
import { useState } from "react"
import Activity from '../components/Activity'
import { recuperarCuenta } from "../services/jugadores.services" 
import { Link } from "react-router-dom"

const RecuperarCuenta = () => {
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) 

    const handleRecuperar = async () => {
        setError("")
        setLoading(true)

        try {
            await recuperarCuenta(email)
            setSuccess(true)
        } catch (err) {
            console.error(err)
            // Mostramos el mensaje del error si existe, o uno genérico
            setError(err.message || "No se pudo enviar el correo. Verifica el email.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans animate-fade-in relative overflow-hidden">
            
            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none"></div>

            {/* Tarjeta central */}
            <div className="bg-slate-900 border border-amber-800/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 max-w-md w-full text-center relative z-10">
                
                {/* Acento superior dorado */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>

                {/* Encabezado */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-amber-900/50 shadow-inner">
                        <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-amber-500 tracking-tight">
                        Recuperar Acceso
                    </h2>
                </div>

                {/* Mensaje de Éxito */}
                <Activity mode={success ? 'visible' : 'hidden'}>
                    <div className="bg-green-900/20 border border-green-500/30 text-green-200 p-4 rounded-lg mb-6 shadow-inner">
                        <p className="mb-2 font-serif">✨ Pergamino de recuperación enviado correctamente.</p>
                        <p className="text-xs text-slate-400 mb-4">Revisa tu lechuza mensajera (bandeja de entrada).</p>
                        <Link to="/login" className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-500 rounded border border-amber-900/50 transition-colors text-sm font-bold">
                            Volver al Portal
                        </Link>
                    </div>
                </Activity>

                {/* Mensaje de Error */}
                <Activity mode={error ? 'visible' : 'hidden'}>
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-sm flex items-center justify-center gap-2 animate-pulse">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                </Activity>

                {/* Formulario (Solo si no hubo éxito) */}
                {!success && (
                    <div className="space-y-5">
                        <p className="text-slate-400 text-sm font-serif italic">
                            Introduce tu correo arcano para recibir un enlace mágico de recuperación.
                        </p>

                        <div className="group text-left">
                            <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Email</label>
                            <input
                                type="email"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleRecuperar}
                            disabled={loading}
                            className={`w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transform hover:-translate-y-0.5 border border-amber-500/30 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Enviando...' : '📨 Enviar Hechizo'}
                        </button>

                        <div className="mt-6 pt-4 border-t border-slate-800">
                            <Link to="/login" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                                Cancelar y volver
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecuperarCuenta
//Archivo: react-router/src/pages/RestablecerContrasenia.jsx
import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { restablecerContrasenia } from '../services/jugadores.services'

const RestablecerContrasenia = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [mensaje, setMensaje] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        setMensaje(null)

        // Validaciones locales
        if (password.length < 6) {
            setError(true)
            setMensaje("La contraseña debe tener al menos 6 caracteres.")
            return
        }

        if (password !== confirmPassword) {
            setError(true)
            setMensaje("Las contraseñas no coinciden.")
            return
        }

        setLoading(true)

        try {
            // Llamada al servicio con el token de la URL y la nueva password
            await restablecerContrasenia(token, password)
            
            setMensaje("¡Contraseña restaurada con éxito! Redirigiendo...")
            
            // Redirigir al login
            setTimeout(() => {
                navigate("/login")
            }, 2500)

        } catch (err) {
            setError(true)
            setMensaje(err.message || "El enlace ha expirado o es inválido.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            
            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-amber-900 via-amber-600 to-amber-900"></div>

            <div className="relative w-full max-w-md bg-slate-900 border border-amber-800/50 p-8 rounded-xl shadow-[0_0_40px_rgba(245,158,11,0.1)] animate-fade-in">
                
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <div className="inline-block p-3 rounded-full bg-amber-900/20 border border-amber-700/50 mb-4">
                        <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-amber-500 font-serif">Nueva Contraseña</h1>
                    <p className="text-slate-400 text-sm mt-2">Introduce tu nueva clave para recuperar el acceso a tu cuenta.</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Input Password */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-amber-600 uppercase tracking-widest">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-amber-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Input Confirmar Password */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-amber-600 uppercase tracking-widest">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-amber-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Mensajes de Feedback */}
                    {mensaje && (
                        <div className={`text-center text-sm p-3 rounded border ${
                            error 
                                ? 'bg-red-900/20 border-red-800 text-red-300' 
                                : 'bg-green-900/20 border-green-800 text-green-300'
                        }`}>
                            {mensaje}
                        </div>
                    )}

                    {/* Botón de Acción */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold uppercase tracking-wider rounded shadow-lg transition-all transform hover:scale-[1.02] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Restableciendo...' : 'Guardar Nueva Contraseña'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">
                        ← Volver al Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RestablecerContrasenia
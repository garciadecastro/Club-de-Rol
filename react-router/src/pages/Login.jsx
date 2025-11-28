//Archivo: react-router/src/pages/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../contexts/SessionContext'
import { authLogin } from '../services/auth.services'

/**
 * Página: Login (Inicio de Sesión)
 */
const Login = () => {
    // Estado local para los campos del formulario
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState("")

    const navigate = useNavigate()
    const login = useLogin() // Hook del contexto para guardar la sesión globalmente

    const handleLogin = (e) => {
        e.preventDefault()

        authLogin({ email, password: pass })
            .then(data => {
                console.log("BACKEND:", data)

                // Validación estricta: Si no hay ID o token, algo falló en el backend
                if (!data._id || !data.token) {
                    throw new Error("Respuesta inválida del servidor")
                }

                // Adaptamos el objeto usuario para guardarlo limpio en el contexto
                const usuarioAdaptado = {
                    _id: data._id,
                    nombre: data.nombre,
                    email: data.email,
                    juegosFavoritos: data.juegosFavoritos ?? [],
                    token: data.token
                }

                // Guardamos en SessionContext (y LocalStorage)
                login(usuarioAdaptado)

                // Redirigimos al usuario a su perfil o dashboard
                navigate("/perfil")
            })
            .catch(error => {
                // Capturamos cualquier error (credenciales, red, etc.)
                setErr(error.message || "Error al iniciar sesión")
            })
    }

    return (
        // Contenedor de pantalla completa con fondo oscuro profundo
        <div className='min-h-screen flex items-center justify-center p-4 bg-slate-950 font-sans'>
            
            {/* Tarjeta de Login: Fondo Slate oscuro, bordes ámbar sutiles */}
            <div className='bg-slate-900 border border-amber-800/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 max-w-md w-full relative overflow-hidden animate-fade-in'>
                
                {/* Acento superior dorado */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>

                <div className='flex flex-col items-center mb-8'>
                    {/* Icono decorativo */}
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-amber-900/50 shadow-inner">
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                    </div>
                    
                    <h2 className='text-3xl font-bold text-amber-500 font-serif tracking-tight'>Iniciar Sesión</h2>
                    <p className='text-slate-400 mt-2 text-sm italic font-serif'>Bienvenido de nuevo, aventurero.</p>
                </div>

                {/* Mensaje de Error */}
                {err && (
                    <div className='bg-red-950/30 border border-red-800/50 text-red-300 rounded-lg p-3 mb-6 text-sm text-center flex items-center justify-center gap-2 animate-pulse'>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {err}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    
                    {/* Input Email */}
                    <div className="group">
                        <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Email Arcano</label>
                        <input
                            type='email'
                            className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='gandalf@mordor.com'
                            required
                        />
                    </div>

                    {/* Input Password */}
                    <div className="group">
                        <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Palabra Secreta</label>
                        <input
                            type='password'
                            className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors'
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='••••••••'
                            required
                        />
                        <div className="flex justify-end mt-1">
                            <Link to="/recuperar-cuenta" className="text-xs text-slate-500 hover:text-amber-400 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>

                    {/* Botón Submit */}
                    <button 
                        type="submit" 
                        className='w-full py-3.5 mt-2 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transform hover:-translate-y-0.5 border border-amber-500/30'
                    >
                        🗝️ Abrir Portal
                    </button>
                </form>

                {/* Footer del Formulario */}
                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-400 text-sm">
                        ¿Aún no tienes ficha de personaje?
                    </p>
                    <Link 
                        to="/registro" 
                        className="inline-block mt-2 text-amber-500 hover:text-amber-300 font-bold hover:underline transition-colors"
                    >
                        Registrarse en el Gremio
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login
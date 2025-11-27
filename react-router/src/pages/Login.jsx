import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../contexts/SessionContext'
import { authLogin } from '../services/auth.services'

const Login = () => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState("")

    const navigate = useNavigate()
    const login = useLogin()

    const handleLogin = (e) => {
        e.preventDefault()

        authLogin({ email, password: pass })
            .then(data => {

                console.log("BACKEND:", data)

                // Validación estricta según respuesta real
                if (!data._id || !data.token) {
                    throw new Error("Respuesta inválida del servidor")
                }

                // Adaptación al formato del SessionContext
                const usuarioAdaptado = {
                    _id: data._id,
                    nombre: data.nombre,
                    email: data.email,
                    juegosFavoritos: data.juegosFavoritos ?? [],
                    token: data.token
                }

                login(usuarioAdaptado)

                // Redirección correcta al PERFIL
                navigate("/perfil")
            })
            .catch(error => {
                setErr(error.message || "Error al iniciar sesión")
            })
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-dungeon-dark'>
            <div className='bg-dungeon-light border border-gold-600/30 rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden'>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>

                <div className='flex flex-col items-center mb-8'>
                    <h2 className='text-3xl font-bold text-gold-500 font-cinzel'>Iniciar Sesión</h2>
                    <p className='text-gray-400 mt-2'>Bienvenida de nuevo, aventurera.</p>
                </div>

                {err && (
                    <div className='bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg p-3 mb-6 text-sm text-center'>
                        {err}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gold-500/80 mb-1 text-sm">Email Arcano</label>
                        <input
                            type='email'
                            className='w-full bg-dungeon-dark border border-gray-700 rounded-lg p-3 text-parchment focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='gandalf@mordor.com'
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gold-500/80 mb-1 text-sm">Palabra Secreta</label>
                        <input
                            type='password'
                            className='w-full bg-dungeon-dark border border-gray-700 rounded-lg p-3 text-parchment focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors'
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='••••••••'
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className='w-full py-3 mt-4 bg-gold-600 text-dungeon-dark font-bold rounded-lg hover:bg-gold-500 transition-all shadow-lg'
                    >
                        Abrir Portal
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link 
                        to="/registro" 
                        className="text-sm text-gold-500/70 hover:text-gold-500 hover:underline"
                    >
                        ¿No tienes cuenta? Regístrate
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login

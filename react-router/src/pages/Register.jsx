//Archivo: react-router/src/pages/Register.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authRegister } from '../services/auth.services'

/**
 * Página: Registro de Usuario
 */
const Register = () => {
    // Estado para el formulario
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [err, setErr] = useState("")
    const navigate = useNavigate()

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setErr("")

        // Validación básica
        if (formData.password !== formData.passwordConfirm) {
            setErr("Las contraseñas no coinciden")
            return
        }

        if (formData.password.length < 6) {
            setErr("La contraseña debe tener al menos 6 caracteres")
            return
        }

        // Preparamos los datos para enviar al backend
        const datos = {
            nombre: formData.nombre,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm
        }

        authRegister(datos)
            .then(() => {
                // Si todo sale bien, redirigimos al login
                navigate("/login")
            })
            .catch(error => {
                setErr(error.message || "Error al registrar")
            })
    }

    return (
        // Contenedor principal
        <div className='min-h-screen flex items-center justify-center p-4 bg-slate-950 font-sans animate-fade-in'>
            
            {/* Tarjeta de Registro */}
            <div className='bg-slate-900 border border-amber-800/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 max-w-md w-full relative overflow-hidden'>
                
                {/* Acento superior dorado */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>

                <div className='flex flex-col items-center mb-8'>
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-amber-900/50 shadow-inner">
                        <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    </div>
                    
                    <h2 className='text-3xl font-bold text-amber-500 font-serif tracking-tight'>Nuevo Registro</h2>
                    <p className='text-slate-400 mt-2 text-sm italic font-serif'>Únete a la hermandad de aventureros.</p>
                </div>

                {/* Mensaje de Error */}
                {err && (
                    <div className='bg-red-950/30 border border-red-800/50 text-red-300 rounded-lg p-3 mb-6 text-sm text-center flex items-center justify-center gap-2 animate-pulse'>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {err}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    
                    {/* Nombre */}
                    <div className="group">
                        <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Nombre de Héroe</label>
                        <input
                            name="nombre"
                            onChange={handleChange}
                            type='text'
                            placeholder='Ej: Aragorn II'
                            className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors'
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Email Arcano</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            type='email'
                            placeholder='tu@email.com'
                            className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors'
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="group">
                        <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Contraseña</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            type='password'
                            placeholder='••••••••'
                            className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors'
                            required
                        />
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="group">
                        <label className="block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest">Confirmar Contraseña</label>
                        <input
                            name="passwordConfirm"
                            onChange={handleChange}
                            type='password'
                            placeholder='••••••••'
                            className='w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors'
                            required
                        />
                    </div>

                    {/* Botón Registrar */}
                    <button 
                        type="submit" 
                        className='w-full py-3.5 mt-4 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transform hover:-translate-y-0.5 border border-amber-500/30'
                    >
                        📜 Firmar Contrato
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-400 text-sm">
                        ¿Ya eres miembro del club?
                    </p>
                    <Link to="/login" className="inline-block mt-2 text-amber-500 hover:text-amber-300 font-bold hover:underline transition-colors">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authRegister } from '../services/auth.services'

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [err, setErr] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setErr("")

        if (formData.password !== formData.passwordConfirm) {
            setErr("Las contraseñas no coinciden")
            return
        }

        // SOLO enviar los campos reales del backend
        const datos = {
            nombre: formData.nombre,
            email: formData.email,
            password: formData.password
        }

        authRegister(datos)
            .then(() => {
                navigate("/login")
            })
            .catch(error => {
                setErr(error.message || "Error al registrar")
            })
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-dungeon-dark'>
            <div className='bg-dungeon-light border border-gold-600/30 rounded-2xl shadow-2xl p-8 max-w-md w-full relative'>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>

                <div className='flex flex-col items-center mb-8'>
                    <h2 className='text-3xl font-bold text-gold-500 font-cinzel'>Nuevo Registro</h2>
                    <p className='text-gray-400 mt-2'>Únete a la hermandad.</p>
                </div>

                {err && (
                    <div className='bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg p-3 mb-6 text-sm text-center'>
                        {err}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        name="nombre"
                        onChange={handleChange}
                        type='text'
                        placeholder='Nombre de Héroe'
                        className='w-full bg-dungeon-dark border border-gray-700 rounded-lg p-3 text-parchment focus:border-gold-500 outline-none'
                        required
                    />

                    <input
                        name="email"
                        onChange={handleChange}
                        type='email'
                        placeholder='Email'
                        className='w-full bg-dungeon-dark border border-gray-700 rounded-lg p-3 text-parchment focus:border-gold-500 outline-none'
                        required
                    />

                    <input
                        name="password"
                        onChange={handleChange}
                        type='password'
                        placeholder='Contraseña'
                        className='w-full bg-dungeon-dark border border-gray-700 rounded-lg p-3 text-parchment focus:border-gold-500 outline-none'
                        required
                    />

                    <input
                        name="passwordConfirm"
                        onChange={handleChange}
                        type='password'
                        placeholder='Confirmar Contraseña'
                        className='w-full bg-dungeon-dark border border-gray-700 rounded-lg p-3 text-parchment focus:border-gold-500 outline-none'
                        required
                    />

                    <button
                        type="submit"
                        className='w-full py-3 mt-4 bg-gold-600 text-dungeon-dark font-bold rounded-lg hover:bg-gold-500 transition-all shadow-lg'
                    >
                        Registrarse
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-gold-500/70 hover:text-gold-500 hover:underline">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register

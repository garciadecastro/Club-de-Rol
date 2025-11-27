import React, { useState } from 'react'
import Activity from '../components/Activity'
import { createCampana } from '../services/campanas.services'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../contexts/SessionContext'   // ← FIX IMPORTANTE

const NuevaCampana = () => {
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()
    const usuario = useUsuario()      // ← Para enviar creador_id

    const validateForm = (payload) => {
        const error = {}
        if (!payload.titulo) error.titulo = "El título es requerido"
        if (payload.titulo && payload.titulo.length < 3) error.titulo = "El título debe tener al menos 3 caracteres"
        if (!payload.sistema) error.sistema = "El sistema de juego es requerido"

        setErrores(error)
        return Object.keys(error).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            titulo: e.target.titulo.value.trim(),
            sistema: e.target.sistema.value.trim(),
            descripcion: e.target.descripcion.value.trim(),
            imagen: e.target.imagen.value.trim(),
            creador_id: usuario?._id   // ← FIX CRÍTICO
        }

        if (!validateForm(payload)) return

        createCampana(payload)
            .then(res => {
                if (!res.insertedId) {
                    throw new Error("Error inesperado al crear campaña")
                }

                navigate("/campanas")
            })
            .catch(err => {
                console.error("Error al crear campaña:", err.message)
            })
    }

    return (
        <div className='min-h-screen bg-dungeon-dark flex items-center justify-center p-4 font-sans text-parchment'>
            <div className='max-w-2xl w-full mt-10 p-8 bg-dungeon-light border-2 border-gold-600/50 rounded-lg shadow-2xl shadow-black'>
                <h1 className='text-3xl py-4 font-bold text-gold-500 font-cinzel text-center border-b border-gold-600/30 mb-6'>
                    Crear Nueva Campaña
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Título */}
                    <div>
                        <label className='block text-sm font-bold text-gold-500 mb-1'>
                            Título de la Aventura
                        </label>

                        <input
                            className='w-full p-3 bg-slate-900 border border-gold-600/30 rounded text-parchment
                                       focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors'
                            type="text"
                            name="titulo"
                            placeholder="Ej: La Maldición de Strahd"
                        />

                        <Activity mode={errores.titulo ? 'visible' : 'hidden'}>
                            <p className="text-red-400 text-sm mt-1">{errores.titulo}</p>
                        </Activity>
                    </div>

                    {/* Sistema */}
                    <div>
                        <label className='block text-sm font-bold text-gold-500 mb-1'>
                            Sistema de Juego
                        </label>

                        <input
                            className='w-full p-3 bg-slate-900 border border-gold-600/30 rounded text-parchment
                                       focus:border-gold-500 outline-none'
                            type="text"
                            name="sistema"
                            placeholder="Ej: D&D 5e, Pathfinder, Vampiro..."
                        />

                        <Activity mode={errores.sistema ? 'visible' : 'hidden'}>
                            <p className="text-red-400 text-sm mt-1">{errores.sistema}</p>
                        </Activity>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className='block text-sm font-bold text-gold-500 mb-1'>
                            Descripción / Sinopsis
                        </label>

                        <textarea
                            className='w-full p-3 bg-slate-900 border border-gold-600/30 rounded text-parchment
                                       focus:border-gold-500 outline-none h-32 resize-none'
                            name="descripcion"
                            placeholder="Describe brevemente de qué trata tu campaña..."
                        />
                    </div>

                    {/* Imagen */}
                    <div>
                        <label className='block text-sm font-bold text-gold-500 mb-1'>
                            URL de Imagen (Portada)
                        </label>

                        <input
                            className='w-full p-3 bg-slate-900 border border-gold-600/30 rounded text-parchment
                                       focus:border-gold-500 outline-none'
                            type="text"
                            name="imagen"
                            placeholder="https://..."
                        />
                    </div>

                    <button
                        className='w-full py-3 mt-4 bg-gold-600 hover:bg-gold-500 text-dungeon-dark font-bold
                                   rounded transition-all transform hover:scale-[1.02] shadow-lg'
                        type="submit"
                    >
                        Invocar Campaña
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NuevaCampana

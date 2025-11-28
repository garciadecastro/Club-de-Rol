//Archivo: react-router/src/pages/NuevaCampana.jsx
import React, { useState } from 'react'
import Activity from '../components/Activity'
import { createCampana } from '../services/campanas.services'
import { useNavigate, Link } from 'react-router-dom'
import { useUsuario } from '../contexts/SessionContext'

/**
 * Página: Crear Nueva Campaña
 */
const NuevaCampana = () => {
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()
    const usuario = useUsuario()

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
            creador_id: usuario?._id 
        }

        if (!validateForm(payload)) return

        createCampana(payload)
            .then(res => {
                // Validación robusta: Mongo devuelve { acknowledged: true, insertedId: ... }
                if (!res.insertedId && !res._id) {
                    throw new Error("Error inesperado al crear campaña")
                }
                navigate("/campanas")
            })
            .catch(err => {
                console.error("Error al crear campaña:", err.message)
                setErrores({ global: "No se pudo crear la campaña. Intenta nuevamente." })
            })
    }

    return (
        <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans animate-fade-in'>
            <div className='max-w-2xl w-full p-8 bg-slate-900 border border-amber-800/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden'>
                
                {/* Acento superior */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>

                {/* Cabecera */}
                <div className="mb-8 text-center">
                    <h1 className='text-3xl font-bold text-amber-500 font-serif tracking-tight mb-2'>
                        Crear Nueva Aventura
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Prepara el tablero, Dungeon Master. Tu mundo comienza aquí.
                    </p>
                </div>

                {/* Mensaje de Error Global */}
                <Activity mode={errores.global ? 'visible' : 'hidden'}>
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded mb-6 text-sm text-center">
                        {errores.global}
                    </div>
                </Activity>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Título */}
                    <div className="group">
                        <label className='block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest'>
                            Título de la Campaña
                        </label>
                        <input
                            className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700'
                            type="text"
                            name="titulo"
                            placeholder="Ej: La Maldición de Strahd"
                        />
                        <Activity mode={errores.titulo ? 'visible' : 'hidden'}>
                            <p className="text-red-400 text-xs mt-1 ml-1">{errores.titulo}</p>
                        </Activity>
                    </div>

                    {/* Sistema */}
                    <div className="group">
                        <label className='block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest'>
                            Sistema de Juego
                        </label>
                        <input
                            className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700'
                            type="text"
                            name="sistema"
                            placeholder="Ej: D&D 5e, Pathfinder, Vampiro..."
                        />
                        <Activity mode={errores.sistema ? 'visible' : 'hidden'}>
                            <p className="text-red-400 text-xs mt-1 ml-1">{errores.sistema}</p>
                        </Activity>
                    </div>

                    {/* Descripción */}
                    <div className="group">
                        <label className='block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest'>
                            Sinopsis / Prólogo
                        </label>
                        <textarea
                            className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700 h-32 resize-none'
                            name="descripcion"
                            placeholder="Describe brevemente de qué trata tu campaña..."
                        />
                    </div>

                    {/* Imagen */}
                    <div className="group">
                        <label className='block text-amber-500/80 mb-1.5 text-xs font-bold uppercase tracking-widest'>
                            Portada (URL de Imagen)
                        </label>
                        <input
                            className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700'
                            type="text"
                            name="imagen"
                            placeholder="https://..."
                        />
                    </div>

                    {/* Acciones */}
                    <div className="pt-4 flex flex-col md:flex-row gap-4 items-center">
                        <Link 
                            to="/campanas"
                            className="w-full md:w-auto px-6 py-3 text-slate-400 hover:text-amber-400 text-sm font-bold transition-colors order-2 md:order-1 text-center"
                        >
                            Cancelar
                        </Link>
                        
                        <button
                            className='w-full md:flex-1 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg border border-amber-500/30 order-1 md:order-2 transform hover:-translate-y-0.5'
                            type="submit"
                        >
                            Invocar Campaña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NuevaCampana
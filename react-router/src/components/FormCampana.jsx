//Archivo: react-router/src/components/FormCampana.jsx
import React, { useState, useEffect } from 'react'
import Activity from './Activity'
import * as JuegosService from '../services/juegos.services'
import * as JugadoresService from '../services/jugadores.services'

/**
 * Formulario de Creación / Edición de Campañas
 * Gestiona la selección de juego y tarjetas de jugadores.
 */
const FormCampana = ({
    initialData = {},
    loading,
    errors = {},
    onSubmit,
    buttonText
}) => {

    const [juegos, setJuegos] = useState([])
    const [jugadoresDisponibles, setJugadoresDisponibles] = useState([])

    // Normalizamos jugadores iniciales a array de IDs
    const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState(
        Array.isArray(initialData.jugadores)
            ? initialData.jugadores.map(j =>
                typeof j === 'string' ? j : j._id
              )
            : []
    )

    useEffect(() => {
        JuegosService.getJuegos()
            .then(setJuegos)
            .catch(() => {})

        JugadoresService.getJugadoresPublicos()
            .then(setJugadoresDisponibles)
            .catch(() => {})
    }, [])

    // Toggle para seleccionar/deseleccionar tarjetas
    const toggleJugador = (idJugador) => {
        if (jugadoresSeleccionados.includes(idJugador)) {
            setJugadoresSeleccionados(prev => prev.filter(id => id !== idJugador))
        } else {
            if (jugadoresSeleccionados.length >= 6) return 
            setJugadoresSeleccionados(prev => [...prev, idJugador])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        
        // Inyectamos el array de IDs
        data.jugadores = jugadoresSeleccionados

        // Enviamos DATA limpia al padre, no el evento
        onSubmit(data)
    }

    const getInitialValue = (name) => initialData[name] || ''

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* TÍTULO */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">
                    Título de la Aventura
                </label>
                <input
                    type="text"
                    name="titulo"
                    defaultValue={getInitialValue('titulo')}
                    className={`w-full p-3 bg-slate-950 border ${
                        errors.titulo ? 'border-red-500' : 'border-slate-700'
                    } rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none`}
                    required
                />
                <Activity mode={errors.titulo ? 'visible' : 'hidden'}>
                    <p className="text-red-400 text-xs mt-1">{errors.titulo}</p>
                </Activity>
            </div>

            {/* JUEGO */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">
                    Juego Base
                </label>
                <select
                    name="juego_id"
                    defaultValue={getInitialValue('juego_id')}
                    className={`w-full p-3 bg-slate-950 border ${
                        errors.juego_id ? 'border-red-500' : 'border-slate-700'
                    } rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none`}
                    required
                >
                    <option value="">— Selecciona un juego —</option>
                    {juegos.map(juego => (
                        <option key={juego._id} value={juego._id}>
                            {juego.nombre} ({juego.editorial})
                        </option>
                    ))}
                </select>
                <input type="hidden" name="sistema" value="Sistema automático" />
                <Activity mode={errors.juego_id ? 'visible' : 'hidden'}>
                    <p className="text-red-400 text-xs mt-1">{errors.juego_id}</p>
                </Activity>
            </div>

            {/* JUGADORES (GRID DE TARJETAS) */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest flex justify-between">
                    <span>Invitar Aventureros</span>
                    <span className={`${jugadoresSeleccionados.length >= 6 ? 'text-red-400' : 'text-slate-500'} font-normal`}>
                        ({jugadoresSeleccionados.length}/6)
                    </span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-slate-900">
                    {jugadoresDisponibles.map(jugador => {
                        const isSelected = jugadoresSeleccionados.includes(jugador._id)
                        return (
                            <div 
                                key={jugador._id}
                                onClick={() => toggleJugador(jugador._id)}
                                className={`
                                    p-3 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-between group/card
                                    ${isSelected 
                                        ? 'bg-amber-900/40 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                                        : 'bg-slate-950 border-slate-700 hover:border-slate-500 hover:bg-slate-900'
                                    }
                                `}
                            >
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold ${isSelected ? 'text-amber-100' : 'text-slate-300'}`}>
                                        {jugador.nombre}
                                    </span>
                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">
                                        {jugador.email}
                                    </span>
                                </div>
                                <div className={`
                                    w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                                    ${isSelected 
                                        ? 'bg-amber-500 border-amber-500' 
                                        : 'border-slate-600 bg-slate-900 group-hover/card:border-slate-400'
                                    }
                                `}>
                                    {isSelected && (
                                        <svg className="w-3 h-3 text-slate-900 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {jugadoresDisponibles.length === 0 && (
                    <p className="text-xs text-slate-500 mt-2 italic">No hay jugadores disponibles...</p>
                )}
            </div>

            {/* IMAGEN Y DESCRIPCIÓN */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">URL de Imagen</label>
                <input type="url" name="imagen" defaultValue={getInitialValue('imagen')} className={`w-full p-3 bg-slate-950 border ${errors.imagen ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 outline-none`} />
            </div>
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Sinopsis</label>
                <textarea name="descripcion" defaultValue={getInitialValue('descripcion')} className={`w-full p-3 bg-slate-950 border ${errors.descripcion ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 outline-none h-32 resize-none`} />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 mt-6 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg border border-amber-500/30 disabled:opacity-50">
                {loading ? 'Procesando…' : buttonText}
            </button>
        </form>
    )
}
export default FormCampana
//Archivo: react-router/src/pages/NuevaCampana.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Activity from '../components/Activity' 
import FormCampana from '../components/FormCampana' 
import { createCampana } from '../services/campanas.services'
import { useUsuario } from '../contexts/SessionContext'

const NuevaCampana = () => {
    const [errores, setErrores] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const usuario = useUsuario()

    const validateForm = (payload) => {
        const error = {}
        if (!payload.titulo || payload.titulo.length < 3) error.titulo = "El título debe tener al menos 3 caracteres"
        if (!payload.juego_id) error.juego_id = "Debes seleccionar un juego"
        setErrores(error)
        return Object.keys(error).length === 0
    }

    // Recibe DATA
    const handleSubmit = (data) => {
        const payload = {
            ...data,
            sistema: "Sistema Automático", 
            creador_id: usuario?._id
        }

        if (!validateForm(payload)) return

        setLoading(true)
        createCampana(payload)
            .then(res => {
                if (!res._id && !res.insertedId) throw new Error("Error inesperado")
                navigate("/campanas")
            })
            .catch(() => setErrores({ global: "No se pudo crear la campaña." }))
            .finally(() => setLoading(false))
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans animate-fade-in">
            <div className="max-w-2xl w-full p-8 bg-slate-900 border border-amber-800/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>
                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-amber-500 font-serif tracking-tight mb-2">Crear Nueva Aventura</h1>
                    <p className="text-slate-400 text-sm">Prepara el tablero, Dungeon Master.</p>
                </div>

                <Activity mode={errores.global ? 'visible' : 'hidden'}>
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded mb-6 text-sm text-center">{errores.global}</div>
                </Activity>

                <FormCampana loading={loading} errors={errores} onSubmit={handleSubmit} buttonText="Invocar Campaña" />

                <div className="mt-6 text-center">
                    <Link to="/campanas" className="text-slate-400 hover:text-amber-400 text-sm font-bold transition-colors">Cancelar</Link>
                </div>
            </div>
        </div>
    )
}
export default NuevaCampana
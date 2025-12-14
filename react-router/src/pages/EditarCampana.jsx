//Archivo: react-router/src/pages/EditarCampana.jsx
import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { editarCampana } from '../services/campanas.services'
import { useCampana } from '../hooks/useCampanas'
import Activity from '../components/Activity' 
import FormCampana from '../components/FormCampana' 

const EditarCampana = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { campana, loading: loadingData, error: errorData } = useCampana(id)
    
    const [errores, setErrores] = useState({})
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const validateForm = (payload) => {
        const error = {}
        if (!payload.titulo || payload.titulo.length < 3) error.titulo = "El título debe tener al menos 3 caracteres"
        if (!payload.juego_id) error.juego_id = "Debes seleccionar un juego"
        setErrores(error)
        return Object.keys(error).length === 0
    }

    // Recibe DATA
    const handleSubmit = (data) => {
        setLoadingSubmit(true)
        
        const payload = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: data.imagen,
            juego_id: data.juego_id,
            jugadores: data.jugadores,
            sistema: "Sistema Automático"
        }

        if (!validateForm(payload)) {
            setLoadingSubmit(false)
            return
        }

        editarCampana(id, payload)
            .then(() => navigate(`/campanas/${id}`))
            .catch(err => {
                console.error(err)
                setErrores({ global: "No se pudo actualizar la campaña." })
            })
            .finally(() => setLoadingSubmit(false))
    }

    if (loadingData) return <div className="flex justify-center items-center h-screen text-amber-500">Cargando...</div>
    if (errorData) return <div className="p-8 text-center text-red-400">Error: {errorData}</div>

    return (
        <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans animate-fade-in'>
            <div className='max-w-2xl w-full p-8 bg-slate-900 border border-amber-800/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden'>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>

                <div className="mb-8 text-center">
                    <h1 className='text-3xl font-bold text-amber-500 font-serif tracking-tight mb-2'>Editar Aventura</h1>
                    <p className="text-slate-400 text-sm">Reescribe la historia, Dungeon Master.</p>
                </div>

                <Activity mode={errores.global ? 'visible' : 'hidden'}>
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded mb-6 text-sm text-center">{errores.global}</div>
                </Activity>

                <FormCampana initialData={campana} onSubmit={handleSubmit} loading={loadingSubmit} errors={errores} buttonText="Guardar Cambios" />

                <div className="mt-4 text-center">
                    <Link to={`/campanas/${id}`} className="text-slate-500 hover:text-amber-400 text-sm font-bold transition-colors">Cancelar</Link>
                </div>
            </div>
        </div>
    )
}
export default EditarCampana
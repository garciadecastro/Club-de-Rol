//Archivo: react-router/src/pages/JuegosEditar.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FormJuego from '../components/FormJuego';
import { useJuego } from '../hooks/useJuegos';
import { editJuego, deleteJuego } from '../services/juegos.services';

/**
 * Página: Formulario para editar un Juego existente.
 */
const JuegosEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { juego, loading: loadingData, error: errorData } = useJuego(id);
    const [apiErrors, setApiErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    // --- ESTADOS DE CARGA / ERROR DE DATOS ---
    if (loadingData) return <div className="text-amber-500 text-center p-10">Cargando datos del tomo...</div>;
    if (errorData) return <div className="text-red-400 text-center p-10">Error al cargar juego: {errorData}</div>;
    if (!juego || !juego._id) return <div className="text-slate-500 text-center p-10">Tomo no encontrado.</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setLoading(true);

        const data = Object.fromEntries(new FormData(e.target).entries());
        
        try {
            await editJuego(id, data);
            alert("Tomo actualizado con éxito. Redirigiendo...");
            navigate("/juegos"); 
        } catch (error) {
            setLoading(false);
            if (error.errors && Array.isArray(error.errors)) {
                const yupErrors = error.errors.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setApiErrors(yupErrors);
            } else {
                setApiErrors({ global: error.message || "Error al intentar actualizar." });
            }
        }
    };

    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de querer eliminar el tomo: ${juego.nombre}? (Borrado Lógico)`)) return;
        
        try {
            await deleteJuego(id);
            alert("Tomo eliminado de la biblioteca.");
            navigate("/juegos");
        } catch (error) {
            setApiErrors({ global: error.message || "Error al intentar eliminar." });
        }
    };

    return (
        <div className='max-w-3xl mx-auto p-4 md:p-8 animate-fade-in'>
            <Link to="/juegos" className="group text-slate-400 hover:text-amber-400 mb-6 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver al Compendio</span>
            </Link>

            <div className="bg-slate-900 border border-amber-800/40 rounded-xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                    <h1 className='text-3xl font-bold font-serif text-amber-500'>Editar Tomo: {juego.nombre}</h1>
                    <button 
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300 text-sm border border-red-900/50 p-2 rounded transition-colors"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Eliminar
                    </button>
                </div>
                
                {apiErrors.global && (
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-sm text-center">
                        {apiErrors.global}
                    </div>
                )}

                <FormJuego 
                    onSubmit={handleSubmit}
                    initialData={juego}
                    loading={loading}
                    errors={apiErrors}
                    buttonText="Guardar Cambios"
                />
            </div>
        </div>
    );
};

export default JuegosEditar;
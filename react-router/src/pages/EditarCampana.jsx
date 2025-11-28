//Archivo: react-router/src/pages/EditarCampana.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCampana } from '../hooks/useCampanas';
import { editCampana, deleteCampana } from '../services/campanas.services';
import FormCampana from '../components/FormCampana'; 

/**
 * Página: Formulario para editar una Campaña existente.
 */
const EditarCampana = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { campana, loading: loadingData, error: errorData } = useCampana(id);
    const [apiErrors, setApiErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    // --- ESTADOS DE CARGA / ERROR DE DATOS ---
    if (loadingData) return <div className="text-amber-500 text-center p-10">Consultando la crónica de la campaña...</div>;
    if (errorData) return <div className="text-red-400 text-center p-10">Error al cargar campaña: {errorData}</div>;
    if (!campana || !campana._id) return <div className="text-slate-500 text-center p-10">Campaña no encontrada.</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setLoading(true);

        const data = Object.fromEntries(new FormData(e.target).entries());
        
        try {

            await editCampana(id, data);
            alert("Campaña actualizada con éxito.");
            navigate(`/campanas/${id}`);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.message || "Error al intentar actualizar.";
            

            if (error.errors) {
                const yupErrors = error.errors.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setApiErrors(yupErrors);
            } else {
                setApiErrors({ global: errorMessage });
            }
        }
    };

    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de querer finalizar permanentemente la campaña: ${campana.titulo}? (Borrado Lógico)`)) return;
        
        try {
            await deleteCampana(id); 
            alert("Campaña finalizada y archivada.");
            navigate("/campanas");
        } catch (error) {
            setApiErrors({ global: error.message || "Error al intentar eliminar." });
        }
    };

    return (
        <div className='max-w-3xl mx-auto p-4 md:p-8 animate-fade-in'>
            <Link to={`/campanas/${id}`} className="group text-slate-400 hover:text-amber-400 mb-6 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver al Detalle</span>
            </Link>

            <div className="bg-slate-900 border border-amber-800/40 rounded-xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                    <h1 className='text-3xl font-bold font-serif text-amber-500'>Editar Campaña: {campana.titulo}</h1>
                    <button 
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300 text-sm border border-red-900/50 p-2 rounded transition-colors flex items-center gap-2"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Archivar Campaña
                    </button>
                </div>
                
                {apiErrors.global && (
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-sm text-center">
                        {apiErrors.global}
                    </div>
                )}

                <FormCampana 
                    onSubmit={handleSubmit}
                    initialData={campana}
                    loading={loading}
                    errors={apiErrors}
                    buttonText="Guardar Cambios de Campaña"
                />
            </div>
        </div>
    );
};

export default EditarCampana;
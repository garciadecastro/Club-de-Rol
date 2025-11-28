//Archivo: react-router/src/pages/JuegosNuevo.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormJuego from '../components/FormJuego';
import { createJuego } from '../services/juegos.services';

/**
 * Página: Formulario para crear un nuevo Juego.
 */
const JuegosNuevo = () => {
    const navigate = useNavigate();
    const [apiErrors, setApiErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setLoading(true);

        // Captura los datos del formulario
        const data = Object.fromEntries(new FormData(e.target).entries());

        try {
            await createJuego(data);
            navigate("/juegos"); // Redirige a la lista al terminar
        } catch (error) {
            setLoading(false);
            
            // Si el error es de validación de YUP (Backend), mostramos campo por campo
            if (error.errors && Array.isArray(error.errors)) {
                const yupErrors = error.errors.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setApiErrors(yupErrors);
            } else {
                setApiErrors({ global: error.message || "Error al conectar con la biblioteca." });
            }
        }
    };

    return (
        <div className='max-w-3xl mx-auto p-4 md:p-8 animate-fade-in'>
            <Link to="/juegos" className="group text-slate-400 hover:text-amber-400 mb-6 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver al Compendio</span>
            </Link>

            <div className="bg-slate-900 border border-amber-800/40 rounded-xl shadow-2xl p-8">
                <h1 className='text-3xl font-bold font-serif text-amber-500 mb-8'>Registrar Nuevo Tomo</h1>
                
                {apiErrors.global && (
                    <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-sm text-center">
                        {apiErrors.global}
                    </div>
                )}

                <FormJuego 
                    onSubmit={handleSubmit}
                    loading={loading}
                    errors={apiErrors}
                    buttonText="Guardar Nuevo Juego"
                />
            </div>
        </div>
    );
};

export default JuegosNuevo;
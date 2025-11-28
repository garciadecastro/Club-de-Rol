//Archivo: react-router/src/components/FormCampana.jsx
import React from 'react';
import Activity from './Activity';

/**
 * Componente reutilizable para el formulario de Creación y Edición de Campañas.
 */
const FormCampana = ({ initialData = {}, loading, errors = {}, onSubmit, buttonText }) => {
    
    // Helper para obtener el valor inicial del campo (usado en edición)
    const getInitialValue = (name) => initialData[name] || '';

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            
            {/* Título de la Aventura */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Título de la Aventura</label>
                <input
                    type="text"
                    name="titulo"
                    defaultValue={getInitialValue('titulo')}
                    className={`w-full p-3 bg-slate-950 border ${errors.titulo ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                    placeholder="Ej: La Maldición de Strahd"
                    required
                />
                <Activity mode={errors.titulo ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.titulo}</p></Activity>
            </div>

            {/* Sistema de Juego */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Sistema de Juego</label>
                <input
                    type="text"
                    name="sistema"
                    defaultValue={getInitialValue('sistema')}
                    className={`w-full p-3 bg-slate-950 border ${errors.sistema ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                    placeholder="Ej: D&D 5e, Pathfinder, Vampiro..."
                    required
                />
                <Activity mode={errors.sistema ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.sistema}</p></Activity>
            </div>

            {/* URL de Imagen (Portada) */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">URL de Imagen (Portada)</label>
                <input
                    type="url"
                    name="imagen"
                    defaultValue={getInitialValue('imagen')}
                    className={`w-full p-3 bg-slate-950 border ${errors.imagen ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                    placeholder="https://tuimagen.com/portada.jpg"
                    required
                />
                <Activity mode={errors.imagen ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.imagen}</p></Activity>
            </div>
            
            {/* Descripción / Sinopsis */}
            <div className="group">
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Sinopsis / Prólogo</label>
                <textarea
                    name="descripcion"
                    defaultValue={getInitialValue('descripcion')}
                    className={`w-full p-3 bg-slate-950 border ${errors.descripcion ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700 h-32 resize-none`}
                    placeholder="Describe brevemente de qué trata tu campaña..."
                />
                <Activity mode={errors.descripcion ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.descripcion}</p></Activity>
            </div>

            {/* BOTÓN DE ACCIÓN */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-6 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg border border-amber-500/30 transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-3"
            >
                {loading ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <span>{buttonText}</span>
                )}
            </button>
        </form>
    );
};

export default FormCampana;
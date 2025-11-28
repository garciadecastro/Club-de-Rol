//Archivo: react-router/src/components/FormJuego.jsx
import React from 'react';
import Activity from './Activity';

/**
 * Componente reutilizable para el formulario de creación y edición de Juegos.
 * @param {object} initialData - Datos iniciales para pre-llenar (usado en edición).
 * @param {boolean} loading - Estado de carga.
 * @param {object} error - Objeto con errores de validación de la API.
 * @param {function} onSubmit - Función que maneja el envío del formulario.
 * @param {string} buttonText - Texto del botón principal.
 */
const FormJuego = ({ initialData = {}, loading, errors = {}, onSubmit, buttonText }) => {
    
    // Función para obtener el valor inicial del campo (usado para edición)
    const getInitialValue = (name) => initialData[name] || '';

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            
            {/* --- GRUPO: NOMBRE / EDITORIAL / AÑO --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Nombre */}
                <div>
                    <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Nombre del Tomo</label>
                    <input
                        type="text"
                        name="nombre"
                        defaultValue={getInitialValue('nombre')}
                        className={`w-full p-3 bg-slate-950 border ${errors.nombre ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                        placeholder="Ej: La Llamada de Cthulhu"
                        required
                    />
                    <Activity mode={errors.nombre ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.nombre}</p></Activity>
                </div>

                {/* Editorial */}
                <div>
                    <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Editorial</label>
                    <input
                        type="text"
                        name="editorial"
                        defaultValue={getInitialValue('editorial')}
                        className={`w-full p-3 bg-slate-950 border ${errors.editorial ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                        placeholder="Ej: Chaosium"
                        required
                    />
                    <Activity mode={errors.editorial ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.editorial}</p></Activity>
                </div>

                {/* Año */}
                <div>
                    <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Año de Publicación</label>
                    <input
                        type="number"
                        name="year"
                        defaultValue={getInitialValue('year')}
                        className={`w-full p-3 bg-slate-950 border ${errors.year ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                        placeholder="2023"
                        required
                    />
                    <Activity mode={errors.year ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.year}</p></Activity>
                </div>
            </div>

            {/* --- GRUPO: PRECIO / CATEGORÍA --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Precio */}
                <div>
                    <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Precio (en monedas de oro)</label>
                    <input
                        type="number"
                        name="precio"
                        step="0.01"
                        defaultValue={getInitialValue('precio')}
                        className={`w-full p-3 bg-slate-950 border ${errors.precio ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                        placeholder="199.99"
                        required
                    />
                    <Activity mode={errors.precio ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.precio}</p></Activity>
                </div>

                {/* Categoría */}
                <div>
                    <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Categoría</label>
                    <input
                        type="text"
                        name="categoria"
                        defaultValue={getInitialValue('categoria')}
                        className={`w-full p-3 bg-slate-950 border ${errors.categoria ? 'border-red-500' : 'border-slate-700'} rounded-lg text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-slate-700`}
                        placeholder="Ej: Ciencia Ficción, Terror Gótico"
                        required
                    />
                    <Activity mode={errors.categoria ? 'visible' : 'hidden'}><p className="text-red-400 text-xs mt-1">{errors.categoria}</p></Activity>
                </div>
            </div>

            {/* URL de Imagen */}
            <div>
                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">URL de Imagen (Portada del Tomo)</label>
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

export default FormJuego;
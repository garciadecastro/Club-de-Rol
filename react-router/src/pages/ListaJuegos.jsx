import React from 'react'
import { useJuegos } from '../hooks/useJuegos'

const ListaJuegos = () => {
    const { juegos = [], loading, error } = useJuegos()

    if (loading) {
        return (
            <div className="p-10 text-center text-gold-500 animate-pulse">
                Consultando la biblioteca...
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-400">
                Error: {error}
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gold-500 font-serif mb-8 border-b border-gold-600/30 pb-4">
                Compendio de Juegos
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {juegos.map(juego => (
                    <div 
                        key={juego._id}
                        className="bg-dungeon-light border border-gray-700 rounded-lg p-4 shadow hover:border-gold-600/40 transition-colors flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-2 gap-2">
                            <h3 className="font-bold text-lg text-parchment leading-tight">
                                {juego.nombre}
                            </h3>

                            <span className="text-xs bg-slate-900 text-gold-500 px-2 py-1 rounded border border-gray-600 shrink-0 whitespace-nowrap">
                                {juego.year}
                            </span>
                        </div>
                        
                        <div className="mb-4 flex-grow">
                            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                                {juego.categoria}
                            </p>
                            <p className="text-sm text-gray-300 italic">
                                {juego.editorial}
                            </p>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-700 flex justify-end items-center">
                            <span className="text-gold-400 font-bold text-lg">
                                ${juego.precio}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListaJuegos

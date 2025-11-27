import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className="min-h-screen bg-dungeon-dark flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gold-500 mb-6 drop-shadow-lg font-cinzel">
                El Club de Rol
            </h1>

            <p className="text-xl md:text-2xl text-parchment mb-12 max-w-2xl">
                Gestiona tus campañas, partidas y personajes en un entorno diseñado para los verdaderos Amos del Calabozo.
            </p>
            
            <div className="flex gap-6">
                <Link 
                    to="/login"
                    className="px-8 py-4 bg-gold-600 text-dungeon-dark font-bold rounded-lg shadow-lg hover:bg-gold-500 transition-all transform hover:scale-105 border-2 border-transparent"
                >
                    Entrar al Calabozo
                </Link>

                <Link 
                    to="/registro"
                    className="px-8 py-4 bg-transparent border-2 border-gold-500 text-gold-500 font-bold rounded-lg shadow-lg hover:bg-dungeon-light transition-all transform hover:scale-105"
                >
                    Unirse al Gremio
                </Link>
            </div>
        </main>
    )
}

export default Home

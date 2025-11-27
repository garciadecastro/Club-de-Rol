import React from "react"
import { Link } from "react-router-dom"
import { useUsuario } from "../contexts/SessionContext"

const Perfil = () => {

    const user = useUsuario()

    if (!user) {
        return (
            <div className="p-10 text-center text-gray-400">
                Cargando perfil...
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            {/* CABECERA */}
            <div className="bg-dungeon-light border border-gold-600/40 rounded-xl p-8 shadow-xl mb-10">
                <h1 className="text-3xl font-bold text-gold-500 font-serif">
                    Mi Perfil
                </h1>

                <p className="text-gray-400 mt-2">
                    Bienvenida de nuevo, aventurera.
                </p>

                <div className="mt-6 bg-dungeon-dark/40 border border-gray-700 rounded-lg p-4">
                    <p className="text-parchment text-lg">
                        <span className="text-gold-500">Nombre:</span> {user.nombre}
                    </p>

                    <p className="text-parchment text-lg mt-2">
                        <span className="text-gold-500">Email:</span> {user.email}
                    </p>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        disabled
                        className="px-4 py-2 bg-gray-700 border border-gray-600 text-gray-400 rounded cursor-not-allowed"
                    >
                        Editar Perfil (próximamente)
                    </button>
                </div>
            </div>

            {/* OPCIONES PRINCIPALES */}
            <div className="grid gap-6">

                <Link
                    to="/campanas"
                    className="block bg-dungeon-light border border-gold-600/40 rounded-xl p-6 shadow hover:bg-dungeon-light/80 transition"
                >
                    <h2 className="text-xl font-bold text-gold-500 font-serif">📘 Mis Campañas</h2>
                    <p className="text-gray-400 mt-1">Gestiona o crea nuevas aventuras.</p>
                </Link>

                <Link
                    to="/juegos"
                    className="block bg-dungeon-light border border-gold-600/40 rounded-xl p-6 shadow hover:bg-dungeon-light/80 transition"
                >
                    <h2 className="text-xl font-bold text-gold-500 font-serif">🎲 Biblioteca de Juegos</h2>
                    <p className="text-gray-400 mt-1">Añade, edita o elimina juegos del club.</p>
                </Link>

                <Link
                    to="/campanas/nueva"
                    className="block bg-dungeon-light border border-gold-600/40 rounded-xl p-6 shadow hover:bg-dungeon-light/80 transition"
                >
                    <h2 className="text-xl font-bold text-gold-500 font-serif">🌟 Crear Nueva Campaña</h2>
                    <p className="text-gray-400 mt-1">Inicia una nueva aventura basada en un juego existente.</p>
                </Link>

                <Link
                    to="/jugadores"
                    className="block bg-dungeon-light border border-gold-600/40 rounded-xl p-6 shadow hover:bg-dungeon-light/80 transition"
                >
                    <h2 className="text-xl font-bold text-gold-500 font-serif">🧙 Jugadores del Club</h2>
                    <p className="text-gray-400 mt-1">Consulta perfiles y comenta sus campañas.</p>
                </Link>

            </div>

        </div>
    )
}

export default Perfil

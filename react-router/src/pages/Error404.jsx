import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dungeon-dark text-parchment px-4">
      <h1 className="text-9xl font-bold text-red-700 drop-shadow-lg mb-4">404</h1>

      <h2 className="text-3xl font-cinzel text-gold-500 mb-6">
        Has caído en el vacío
      </h2>

      <p className="mb-8 text-gray-400 max-w-md text-center">
        La página que buscas ha sido devorada por un dragón.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-gold-600 text-dungeon-dark rounded font-bold hover:bg-gold-500 transition shadow-lg"
      >
        Volver a la taberna (Home)
      </Link>
    </div>
  )
}

export default Error404

//Archivo: react-router/src/pages/Error404.jsx
import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Página de Error 404.
 */
const Error404 = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in">
      
      <h1 className="text-9xl font-bold font-serif text-red-700/80 drop-shadow-[0_0_25px_rgba(185,28,28,0.4)] mb-2 select-none">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-500 mb-6 tracking-wide">
        Has caído en el Vacío
      </h2>

      <div className="mb-10 max-w-md text-slate-400 font-serif italic text-lg leading-relaxed border-l-2 border-red-900/50 pl-6 mx-auto">
        <p>
          "La ruta que intentas explorar ha sido devorada por un dragón anciano, o quizás nunca existió en este plano de la realidad."
        </p>
      </div>

      {/* Botón de regreso */}
      <Link
        to="/"
        className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold rounded-lg border border-amber-500/50 shadow-lg hover:shadow-amber-900/40 hover:from-amber-600 hover:to-amber-500 hover:-translate-y-1 transition-all duration-300"
      >
        🛡️ Volver a la Taberna (Home)
      </Link>
    </div>
  )
}

export default Error404
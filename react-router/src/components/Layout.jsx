//Archivo: react-router/src/components/Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

/**
 * Componente Layout (Estructura Base).
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-amber-50 font-sans selection:bg-amber-700 selection:text-white">
      <Nav />
      
      {/* Agregamos 'container' y padding para centrar el contenido con estilo moderno */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
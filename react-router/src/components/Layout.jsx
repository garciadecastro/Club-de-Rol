import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

const Layout = () => {
  return (
    <div className="min-h-screen bg-dungeon-dark text-parchment font-sans">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

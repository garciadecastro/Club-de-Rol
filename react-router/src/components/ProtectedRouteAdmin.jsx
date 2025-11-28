//Archivo: react-router/src/components/ProtectedRouteAdmin.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUsuario, useToken } from '../contexts/SessionContext'

/**
 * Componente de seguridad para rutas de ADMINISTRADOR.
 */
const ProtectedRouteAdmin = ({ element }) => {
    const usuario = useUsuario()
    const token = useToken()

    // SI NO hay login (usuario o token faltan) → bloquear y mandar al login
    if (!usuario || !token) {
        return <Navigate to="/login" replace />
    }

    
    return element
}

export default ProtectedRouteAdmin
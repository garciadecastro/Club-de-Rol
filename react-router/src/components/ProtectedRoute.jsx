import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUsuario, useToken } from '../contexts/SessionContext'

const ProtectedRoute = ({ element }) => {
    const usuario = useUsuario()
    const token = useToken()

    // Si NO hay login → bloquear
    if (!usuario || !token) {
        return <Navigate to="/login" replace />
    }

    return element
}

export default ProtectedRoute

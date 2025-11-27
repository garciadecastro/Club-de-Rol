import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUsuario, useToken } from '../contexts/SessionContext'

const ProtectedRouteAdmin = ({ element }) => {
    const usuario = useUsuario()
    const token = useToken()

    // SI NO hay login → bloquear
    if (!usuario || !token) {
        return <Navigate to="/login" replace />
    }

    // SIN sistema de roles → por ahora cualquier usuario logueado pasa
    return element
}

export default ProtectedRouteAdmin

//Archivo: react-router/src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUsuario, useToken } from '../contexts/SessionContext'

/**
 * Componente de seguridad para Rutas Protegidas.
 * si el usuario no está logueado, lo manda al login.
 * Si está logueado, renderiza el componente que le pasamos en 'element'.
 * @param {ReactNode} element - El componente de la página que queremos proteger.
 */
const ProtectedRoute = ({ element }) => {
    // Obtenemos el estado de la sesión global
    const usuario = useUsuario()
    const token = useToken()

    if (!usuario || !token) {
        return <Navigate to="/login" replace />
    }

    // Si todo está bien, mostramos la página solicitada
    return element
}

export default ProtectedRoute
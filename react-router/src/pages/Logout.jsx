//Archivo: react-router/src/pages/Logout.jsx
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../contexts/SessionContext'

/**
 * Página: Logout
 * Se encarga de cerrar la sesión y limpiar los datos.
 */
const Logout = () => {

    const logout = useLogout()
    const navigate = useNavigate()

    // useRef para crear una variable que persiste entre renderizados pero no provoca re-render.
    // Lo usamos para que el logout no se ejecute dos veces en modo estricto de React.
    const yaEjecutado = useRef(false)

    useEffect(() => {
        // Solo entramos si no se ha ejecutado antes
        if (!yaEjecutado.current) {
            yaEjecutado.current = true

            // Limpiamos usuario y token del contexto/localStorage
            logout()
            
            // Redirigimos al login
            navigate("/login")
        }
    }, []) // Array vacío: solo se intenta al montar el componente

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-amber-500 font-serif animate-pulse">
            Cerrando el portal...
        </div>
    )
}

export default Logout
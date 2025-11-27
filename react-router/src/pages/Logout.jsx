import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../contexts/SessionContext'

const Logout = () => {

    const logout = useLogout()
    const navigate = useNavigate()

    // Evita doble ejecución en modo estricto
    const yaEjecutado = useRef(false)

    useEffect(() => {
        if (!yaEjecutado.current) {
            yaEjecutado.current = true

            logout()
            navigate("/login")
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-dungeon-dark text-gold-500">
            Cerrando el portal...
        </div>
    )
}

export default Logout

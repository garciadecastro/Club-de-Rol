//Archivo: react-router/src/contexts/SessionContext.jsx
import { createContext, useContext, useState } from "react"

const SessionContext = createContext()

/**
 * Función auxiliar para leer de localStorage de forma segura.
 * Evita que la aplicación falle (crash) si el JSON guardado está corrupto o es inválido.
 */
function safeParse(key) {
    const raw = localStorage.getItem(key)

    if (!raw || raw === "undefined" || raw === "null") {
        return null
    }

    try {
        return JSON.parse(raw)
    } catch {
        return null
    }
}


// Hooks facilitan el acceso a los datos desde cualquier componente

export function useSession() {
    return useContext(SessionContext)
}

/** Devuelve el objeto del usuario logueado (o null) */
export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

/** Devuelve la función para iniciar sesión */
export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

/** Devuelve el token JWT para usar en las peticiones a la API */
export function useToken() {
    const { token } = useSession()
    return token
}

/** Devuelve la función para cerrar sesión */
export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

/**
 * Componente que envuelve la aplicación y provee el estado de sesión.
 * Gestiona el usuario y el token, guardándolos en localStorage para persistencia.
 */
export function SessionProvider({ children }) {

    // Inicializamos el estado leyendo del almacenamiento local (si existe)
    const [usuario, setUsuario] = useState(safeParse("usuario"))
    const [token, setToken] = useState(safeParse("token"))

    const onLogin = (usuario) => {
        setUsuario(usuario)
        setToken(usuario.token)

        // Guardamos en el navegador para no perder sesión al recargar
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("token", JSON.stringify(usuario.token))
    }

    const onLogout = () => {
        setUsuario(null)
        setToken(null)
        // Limpiamos el almacenamiento al salir
        localStorage.clear()
    }

    return (
        <SessionContext.Provider value={{ usuario, setUsuario, onLogin, token, onLogout }}>
            {children}
        </SessionContext.Provider>
    )
}

export { SessionContext }
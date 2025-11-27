import { createContext, useContext, useState } from "react"

const SessionContext = createContext()

// ========= HELPERS =========
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

// ========= CUSTOM HOOKS =========

export function useSession() {
    return useContext(SessionContext)
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useToken() {
    const { token } = useSession()
    return token
}

export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

// ========= PROVIDER =========

export function SessionProvider({ children }) {

    const [usuario, setUsuario] = useState(safeParse("usuario"))
    const [token, setToken] = useState(safeParse("token"))

    const onLogin = (usuario) => {
        setUsuario(usuario)
        setToken(usuario.token)

        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("token", JSON.stringify(usuario.token))
    }

    const onLogout = () => {
        setUsuario(null)
        setToken(null)
        localStorage.clear()
    }

    return (
        <SessionContext.Provider value={{ usuario, setUsuario, onLogin, token, onLogout }}>
            {children}
        </SessionContext.Provider>
    )
}

export { SessionContext }

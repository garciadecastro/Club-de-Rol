import { call } from "./api.services";

// LOGIN
export function authLogin(credenciales) {
    return call({ uri: 'jugadores/login', method: "POST", body: credenciales })
}

// REGISTRO
export function authRegister(credenciales) {
    return call({ uri: 'jugadores', method: "POST", body: credenciales })
}

// RECUPERAR CUENTA (opcional)
export function recuperarCuenta(email) {
    return call({
        uri: 'jugadores/recuperar-cuenta',
        method: "POST",
        body: { email }
    })
}

// RESTABLECER CONTRASEÑA (opcional)
export function restablecerContrasenia(email, password) {
    return call({
        uri: 'jugadores/restablecer-contrasenia',
        method: "POST",
        body: { email, password }
    })
}

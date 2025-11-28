//Archivo: react-router/src/services/auth.services.js
import { call } from "./api.services";

/**
 * Inicia sesión enviando email y contraseña al backend.
 * @param {object} credenciales - Objeto con { email, password }
 */
export function authLogin(credenciales) {
    return call({ uri: 'jugadores/login', method: "POST", body: credenciales })
}

/**
 * Registra un nuevo usuario.
 * @param {object} credenciales - Objeto con { nombre, email, password, passwordConfirm }
 */
export function authRegister(credenciales) {
    return call({ uri: 'jugadores', method: "POST", body: credenciales })
}

/**
 * Solicita un correo de recuperación.
 * Requiere que el backend tenga la ruta POST /api/jugadores/recuperar-cuenta creada.
 */
export function recuperarCuenta(email) {
    return call({
        uri: 'jugadores/recuperar-cuenta',
        method: "POST",
        body: { email }
    })
}

/**
 * Envía la nueva contraseña.
 */
export function restablecerContrasenia(email, password) {
    return call({
        uri: 'jugadores/restablecer-contrasenia',
        method: "POST",
        body: { email, password }
    })
}
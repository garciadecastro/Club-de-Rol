//Archivo: react-router/src/services/jugadores.services.js
import { call } from "./api.services"

// ACTUALIZAR PERFIL
/**
 * Actualiza los datos del usuario (nombre, email, password).
 * Llama a PUT /api/jugadores/:id
 */
export function actualizarPerfil(id, datos) {
    return call({
        uri: `jugadores/${id}`,
        method: "PUT",
        body: datos
    })
}


// ELIMINAR PERFIL
/**
 * Elimina la cuenta del usuario.
 * Llama a DELETE /api/jugadores/:id
 */
export function eliminarPerfil(id) {
    return call({
        uri: `jugadores/${id}`,
        method: "DELETE"
    })
}

// OBTENER TODOS LOS JUGADORES PÚBLICOS
/**
 * Obtiene la lista de todos los jugadores del club.
 * Llama a GET /api/jugadores/publicos
 */
export function getJugadoresPublicos() {
    return call({
        uri: "jugadores/publicos",
        method: "GET"
    })
}

// OBTENER UN JUGADOR POR ID
/**
 * Obtiene el perfil público de un jugador específico.
 * Llama a GET /api/jugadores/:id
 */
export function getJugadorById(id) {
    return call({
        uri: `jugadores/${id}`,
        method: "GET"
    })
}

// --- FUNCIONES NUEVAS PARA RECUPERAR CONTRASEÑA ---

/**
 * 1. Solicita el envío del correo de recuperación.
 * Llama a POST /api/jugadores/recuperar-cuenta
 */
export function recuperarCuenta(email) {
    return call({
        uri: "jugadores/recuperar-cuenta",
        method: "POST",
        body: { email }
    })
}

/**
 * 2. Envía el token y la nueva contraseña para restablecerla.
 * Llama a POST /api/jugadores/restablecer-contrasenia
 * IMPORTANTE: Aquí enviamos el token que pide el backend.
 */
export function restablecerContrasenia(token, nuevaPassword) {
    return call({
        uri: "jugadores/restablecer-contrasenia",
        method: "POST",
        body: { token, password: nuevaPassword } 
    })
}
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

// NUEVO: OBTENER TODOS LOS JUGADORES PÚBLICOS
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
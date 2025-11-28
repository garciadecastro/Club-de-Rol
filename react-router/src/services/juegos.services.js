//Archivo: react-router/src/services/juegos.services.js
import { call } from "./api.services"

/**
 * Obtiene la lista completa de juegos.
 * Llama a GET /api/juegos
 */
export function getJuegos() {
    return call({ uri: 'juegos' })
}

/**
 * Busca un juego por su ID.
 * Llama a GET /api/juegos/:id
 */
export function getJuegoById(id) {
    return call({ uri: 'juegos/' + id })
}

/**
 * Crea un nuevo juego en la base de datos.
 * Llama a POST /api/juegos
 */
export function createJuego(juego) {
    return call({ uri: 'juegos', method: 'POST', body: juego })
}

/**
 * Edita un juego parcialmente.
 * Usamos PATCH para actualizar solo los campos que enviamos
 * Coincide con la ruta router.patch del backend.
 */
export function editJuego(id, juego) {
    return call({ uri: 'juegos/' + id, method: 'PATCH', body: juego })
}

/**
 * Elimina un juego (Soft Delete según el backend).
 * Llama a DELETE /api/juegos/:id
 */
export function deleteJuego(id) {
    return call({ uri: 'juegos/' + id, method: 'DELETE' })
}
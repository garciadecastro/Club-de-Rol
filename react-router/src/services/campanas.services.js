//Archivo: react-router/src/services/campanas.services.js
import { call } from "./api.services"

/**
 * Obtiene la lista de campañas creadas por el usuario logueado.
 * Llama a GET /api/campanas
 */
export function getCampanas() {
    return call({ uri: 'campanas' })
}

/**
 * Obtiene la lista de campañas públicas (Mundo Abierto).
 */
export function getCampanasPublicas() {
    return call({
        uri: "campanas/publicas", 
        method: "GET"
    })
}

/**
 * Obtiene el detalle completo de una campaña específica.
 * Llama a GET /api/campanas/:id
 */
export function getCampanaById(id) {
    return call({ uri: 'campanas/' + id })
}

/**
 * Crea una nueva campaña.
 * Llama a POST /api/campanas
 */
export function createCampana(campana) {
    return call({ uri: 'campanas', method: 'POST', body: campana })
}

/**
 * Edita una campaña existente.
 */
export function editarCampana(id, campana) {
    return call({ uri: 'campanas/' + id, method: 'PUT', body: campana })
}

/**
 * Marca una campaña como eliminada (Soft Delete).
 * Llama a DELETE /api/campanas/:id
 */
export function deleteCampana(id) {
    return call({ uri: 'campanas/' + id, method: 'DELETE' })
}

/**
 * Invita a un jugador a la campaña.
 * Llama a POST /api/campanas/:id/invitar
 */
export function invitarJugador(idCampana, idJugador) {
    return call({
        uri: `campanas/${idCampana}/invitar`,
        method: 'POST',
        body: { idJugador }
    })
}

/**
 * Expulsa a un jugador de la campaña.
 * Llama a DELETE /api/campanas/:id/jugadores/:idJugador
 */
export function expulsarJugador(idCampana, idJugador) {
    return call({
        uri: `campanas/${idCampana}/jugadores/${idJugador}`,
        method: 'DELETE'
    })
}
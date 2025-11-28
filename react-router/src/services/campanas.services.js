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
 * NUEVO: Obtiene la lista de campañas públicas (Mundo Abierto).
 * Llama al endpoint que no requiere filtro de creador de la API.
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
 * @param {object} campana - Datos de la campaña (título, descripción, etc.)
 */
export function createCampana(campana) {
    return call({ uri: 'campanas', method: 'POST', body: campana })
}

/**
 * Edita una campaña existente.
 * Llama a PUT /api/campanas/:id
 */
export function editCampana(id, campana) {
    return call({ uri: 'campanas/' + id, method: 'PUT', body: campana })
}

/**
 * Marca una campaña como eliminada (Soft Delete).
 * Llama a DELETE /api/campanas/:id
 */
export function deleteCampana(id) {
    return call({ uri: 'campanas/' + id, method: 'DELETE' })
}
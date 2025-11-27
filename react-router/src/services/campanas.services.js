import { call } from "./api.services"

// LISTAR CAMPAÑAS DEL USUARIO
export function getCampanas() {
    return call({ uri: 'campanas' })
}

// OBTENER UNA CAMPAÑA POR ID
export function getCampanaById(id) {
    return call({ uri: 'campanas/' + id })
}

// CREAR CAMPAÑA
export function createCampana(campana) {
    return call({ uri: 'campanas', method: 'POST', body: campana })
}

// EDITAR CAMPAÑA (solo actualizar campos → PATCH)
export function editCampana(id, campana) {
    return call({ uri: 'campanas/' + id, method: 'PATCH', body: campana })
}

// ELIMINAR CAMPAÑA (soft delete)
export function deleteCampana(id) {
    return call({ uri: 'campanas/' + id, method: 'DELETE' })
}

import { call } from "./api.services"

// LISTAR TODOS LOS JUEGOS
export function getJuegos() {
    return call({ uri: 'juegos' })
}

// OBTENER 1 JUEGO POR ID
export function getJuegoById(id) {
    return call({ uri: 'juegos/' + id })
}

// CREAR NUEVO JUEGO
export function createJuego(juego) {
    return call({ uri: 'juegos', method: 'POST', body: juego })
}

// EDITAR JUEGO (PATCH → estilo del profesor)
export function editJuego(id, juego) {
    return call({ uri: 'juegos/' + id, method: 'PATCH', body: juego })
}

// ELIMINAR JUEGO
export function deleteJuego(id) {
    return call({ uri: 'juegos/' + id, method: 'DELETE' })
}

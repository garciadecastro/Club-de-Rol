//Archivo: back/services/campanas.services.js
import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

const db = {
    collection: (name) => getDB().collection(name)
}

/**
 * Obtiene todas las campañas activas de un usuario.
 */
export async function getCampanas(userId) {
    return db.collection("campanas")
        .find({ creador_id: new ObjectId(userId), eliminado: { $ne: true } })
        .toArray()
}

/**
 * Obtiene todas las campañas activas (Mundo Abierto).
 */
export async function getCampanasPublicas() {
    return db.collection("campanas")
        .find({ eliminado: { $ne: true } })
        .toArray()
}

/**
 * Busca una campaña específica por ID.
 */
export async function getCampanaById(id) {
    return db.collection("campanas").findOne({ _id: new ObjectId(id) })
}

/**
 * Crea una nueva campaña.
 * Integra validación de ObjectIds y lógica de estado.
 */
export async function crearCampana(campana) {
    // Procesamos los jugadores iniciales si existen
    const jugadoresIds = campana.jugadores 
        ? campana.jugadores.map(id => new ObjectId(id)) 
        : []

    const nuevaCampana = {
        titulo: campana.titulo,
        sistema: campana.sistema,
        descripcion: campana.descripcion,
        imagen: campana.imagen,
        juego_id: new ObjectId(campana.juego_id),
        creador_id: new ObjectId(campana.creador_id),
        jugadores: jugadoresIds,
        // Calculamos si nace completa (si seleccionaste 6 de una vez)
        completa: jugadoresIds.length >= 6, 
        fecha_creacion: new Date(),
        eliminado: false
    }

    const resultado = await db.collection("campanas").insertOne(nuevaCampana)

    return {
        _id: resultado.insertedId,
        ...nuevaCampana
    }
}

/**
 * Edita datos básicos de una campaña.
 * Si se edita la lista de jugadores aquí, recalculamos 'completa'.
 */
export async function editarCampana(id, campana) {
    const { _id, ...datos } = campana

    if (datos.juego_id) datos.juego_id = new ObjectId(datos.juego_id)
    
    // Si se actualizan jugadores masivamente
    if (datos.jugadores) {
        datos.jugadores = datos.jugadores.map(id => new ObjectId(id))
        datos.completa = datos.jugadores.length >= 6
    }

    return db.collection("campanas")
        .updateOne({ _id: new ObjectId(id) }, { $set: datos })
}

/**
 * Agrega un jugador a una campaña (Lógica específica de invitación).
 * Verifica límite de 6 jugadores.
 */
export async function agregarJugador(campanaId, jugadorId) {
    const campana = await getCampanaById(campanaId)

    if (!campana) throw new Error("Campaña no encontrada")
    
    // Validación de seguridad
    const currentPlayers = campana.jugadores || []
    if (currentPlayers.length >= 6) {
        throw new Error("La campaña ya está completa (máximo 6 jugadores)")
    }

    // Verificamos si ya está para no contar mal el length antes de insertar
    const yaExiste = currentPlayers.some(p => p.toString() === jugadorId.toString())
    
    // Calculamos si se completará con este nuevo jugador
    // Si ya existe, el length no cambia. Si no existe, aumenta 1.
    const nuevoLength = yaExiste ? currentPlayers.length : currentPlayers.length + 1
    const estaCompleta = nuevoLength >= 6

    await db.collection("campanas").updateOne(
        { _id: new ObjectId(campanaId) },
        { 
            $addToSet: { jugadores: new ObjectId(jugadorId) },
            $set: { completa: estaCompleta }
        }
    )
    
    return { message: "Jugador añadido", completa: estaCompleta }
}

/**
 * Elimina un jugador de una campaña.
 */
export async function quitarJugador(campanaId, jugadorId) {
    await db.collection("campanas").updateOne(
        { _id: new ObjectId(campanaId) },
        { 
            $pull: { jugadores: new ObjectId(jugadorId) },
            $set: { completa: false } 
        }
    )
}

/**
 * Borrado lógico de campaña.
 */
export function borrarCampana(id) {
    return db.collection("campanas")
        .updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}
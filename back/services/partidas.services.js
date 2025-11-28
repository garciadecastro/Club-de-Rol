//Archivo: back/services/partidas.services.js
import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

const db = { collection: (name) => getDB().collection(name) }

/**
 * Crea una nueva partida (sesión) dentro de una campaña.
 */
export async function crearPartida(partida) {
    const nuevaPartida = {
        ...partida,
        campana_id: new ObjectId(partida.campana_id),
        fecha_creacion: new Date()
    }
    return db.collection("partidas").insertOne(nuevaPartida)
}

/**
 * Obtiene todas las sesiones de una campaña específica.
 */
export async function getPartidasPorCampana(campanaId) {
    return db.collection("partidas")
        .find({ campana_id: new ObjectId(campanaId) })
        .toArray()
}

/**
 * Elimina una partida de la base de datos.
 */
export async function borrarPartida(id) {
    return db.collection("partidas").deleteOne({ _id: new ObjectId(id) })
}
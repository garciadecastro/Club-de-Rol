import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

const db = { collection: (name) => getDB().collection(name) }

export async function crearPartida(partida) {
    const nuevaPartida = {
        ...partida,
        campana_id: new ObjectId(partida.campana_id),
        fecha_creacion: new Date()
    }
    return db.collection("partidas").insertOne(nuevaPartida)
}

export async function getPartidasPorCampana(campanaId) {
    return db.collection("partidas")
        .find({ campana_id: new ObjectId(campanaId) })
        .toArray()
}

export async function borrarPartida(id) {
    return db.collection("partidas").deleteOne({ _id: new ObjectId(id) })
}
import { ObjectId } from "mongodb"
import { db } from "../server.js"

export async function getCampanas(userId) {
    // REQUISITO CLAVE: Filtramos por 'creador_id' para que sea privado
    // Solo devolvemos las campañas que pertenecen al usuario logueado
    return db.collection("campanas")
        .find({ creador_id: new ObjectId(userId), eliminado: { $ne: true } })
        .toArray()
}

export async function getCampanaById(id) {
    return db.collection("campanas").findOne({ _id: new ObjectId(id) })
}

export async function crearCampana(campana) {
    // Aseguramos que el creador_id sea un ObjectId
    const nuevaCampana = {
        ...campana,
        creador_id: new ObjectId(campana.creador_id),
        fecha_creacion: new Date(),
        eliminado: false
    }
    return db.collection("campanas").insertOne(nuevaCampana)
}

export async function editarCampana(id, campana) {
    // Eliminamos _id para no intentar actualizarlo (Mongo no deja)
    const { _id, ...datos } = campana
    return db.collection("campanas").updateOne({ _id: new ObjectId(id) }, { $set: datos })
}

export function borrarCampana(id) {
    // Soft Delete
    return db.collection("campanas").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}
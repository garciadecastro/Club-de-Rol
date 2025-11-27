import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

const db = {
    collection: (name) => getDB().collection(name)
}

export async function getCampanas(userId) {
    return db.collection("campanas")
        .find({ creador_id: new ObjectId(userId), eliminado: { $ne: true } })
        .toArray()
}

export async function getCampanaById(id) {
    return db.collection("campanas").findOne({ _id: new ObjectId(id) })
}

export async function crearCampana(campana) {
    const nuevaCampana = {
        ...campana,
        creador_id: new ObjectId(campana.creador_id),
        fecha_creacion: new Date(),
        eliminado: false
    }

    // 1) Insertamos
    const resultado = await db.collection("campanas").insertOne(nuevaCampana)

    // 2) Devolvemos la campaña COMPLETA
    return {
        _id: resultado.insertedId,
        ...nuevaCampana
    }
}

export async function editarCampana(id, campana) {
    const { _id, ...datos } = campana
    return db.collection("campanas")
        .updateOne({ _id: new ObjectId(id) }, { $set: datos })
}

export function borrarCampana(id) {
    return db.collection("campanas")
        .updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

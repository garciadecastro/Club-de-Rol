//Archivo: back/services/campanas.services.js
import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

// Helper para acceder a colecciones de forma más limpia
const db = {
    collection: (name) => getDB().collection(name)
}

/**
 * Obtiene todas las campañas activas de un usuario.
 * Filtra por 'creador_id' y excluye las que tienen 'eliminado: true' (Soft Delete).
 */
export async function getCampanas(userId) {
    return db.collection("campanas")
        .find({ creador_id: new ObjectId(userId), eliminado: { $ne: true } })
        .toArray()
}

/**
 * Obtiene TODAS las campañas activas, sin importar el creador.
 * Se usa para la vista "Mundo Abierto" (Exploración).
 */
export async function getCampanasPublicas() {
    return db.collection("campanas")
        .find({ eliminado: { $ne: true } }) // Solo filtra las eliminadas lógicamente
        .toArray()
}


/**
 * Busca una campaña específica por su ID.
 */
export async function getCampanaById(id) {
    return db.collection("campanas").findOne({ _id: new ObjectId(id) })
}

/**
 * Crea una nueva campaña.
 * Se encarga de convertir el ID del usuario a ObjectId y añadir la fecha de creación.
 */
export async function crearCampana(campana) {
    const nuevaCampana = {
        ...campana,
        creador_id: new ObjectId(campana.creador_id),
        fecha_creacion: new Date(),
        eliminado: false
    }

    // 1) Insertamos
    const resultado = await db.collection("campanas").insertOne(nuevaCampana)

    // 2) Devolvemos la campaña COMPLETA para que el front la reciba actualizada
    return {
        _id: resultado.insertedId,
        ...nuevaCampana
    }
}

/**
 * Actualiza una campaña existente.
 * Separa el _id del resto de datos para no intentar actualizar el ID (que es inmutable).
 */
export async function editarCampana(id, campana) {
    const { _id, ...datos } = campana
    return db.collection("campanas")
        .updateOne({ _id: new ObjectId(id) }, { $set: datos })
}

/**
 * Realiza un BORRADO LÓGICO (Soft Delete).
 * En lugar de eliminar el documento, cambiamos el estado 'eliminado' a true.
 */
export function borrarCampana(id) {
    return db.collection("campanas")
        .updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}
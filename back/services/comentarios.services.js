import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

const db = { collection: (name) => getDB().collection(name) }

export async function crearComentario(comentario, usuario) {
    const nuevoComentario = {
        texto: comentario.texto,
        partida_id: new ObjectId(comentario.partida_id),
        autor_id: new ObjectId(usuario._id), // Guardamos quién lo escribió
        autor_nombre: usuario.nombre,        // Guardamos el nombre para mostrarlo fácil
        fecha: new Date()
    }
    return db.collection("comentarios").insertOne(nuevoComentario)
}

export async function getComentariosPorPartida(partidaId) {
    return db.collection("comentarios")
        .find({ partida_id: new ObjectId(partidaId) })
        .sort({ fecha: -1 }) // Ordenamos del más nuevo al más viejo
        .toArray()
}

export async function borrarComentario(id) {
    return db.collection("comentarios").deleteOne({ _id: new ObjectId(id) })
}
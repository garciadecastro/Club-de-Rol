import { ObjectId } from "mongodb"
// CAMBIO: Importamos desde el archivo independiente para romper el círculo
import { getDB } from "./database.service.js"

// Truco para mantener el resto del código igual
const db = {
    collection: (name) => getDB().collection(name)
}

export async function getJuegos( filter = {} ) {
    // Inicializamos el filtro para excluir los eliminados (Soft Delete)
    const filterMongo = { eliminado: { $ne: true } }

    // Filtro exacto (equivalente a marca en el modelo)
    if( filter.editorial != undefined ){
        filterMongo.editorial = { $eq: filter.editorial }
    }
    
    // Filtro exacto extra (tienes categorías en tu BD)
    if( filter.categoria != undefined ){
        filterMongo.categoria = { $eq: filter.categoria }
    }

    // Filtros de Rango de Precio
    if( filter.mayorQue != undefined ){
        filterMongo.precio = { $gte: parseInt(filter.mayorQue) }
    }

    if( filter.menorQue != undefined ){
        filterMongo.precio = { $lte: parseInt( filter.menorQue ) }
    }

    if( filter.menorQue != undefined && filter.mayorQue != undefined ){
        filterMongo.$and = [ { precio: { $lte: parseInt( filter.menorQue ) } }, { precio: { $gte: parseInt(filter.mayorQue) } } ]
    }

    // Filtro de Texto (equivalente a modelo en el modelo)
    if( filter.nombre != undefined ){
        filterMongo.nombre = { $regex: filter.nombre, $options: 'i' }
    }

    // No hacemos client.connect() porque ya estamos conectados en server.js
    return db.collection("juegos").find(filterMongo).toArray()
}

export async function getJuegoById(id) {
    return db.collection("juegos").findOne({ _id: new ObjectId(id) })
}

export function guardarJuego(juego){
    return db.collection("juegos").insertOne(juego)
}

// PUT: Reemplazar todo el documento
export async function editarJuego(id, juego){
    return db.collection("juegos").replaceOne({ _id: new ObjectId(id)}, juego)
}

// DELETE: Soft Delete (marcar como eliminado)
export function borrarJuego(id){
    console.log("Borrando juego ID:", id)
    return db.collection("juegos").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

// PATCH: Actualizar campos específicos
export function actualizarJuego(juego){
    // Extraemos el ID del objeto juego para usarlo en el filtro
    const { id, ...datos } = juego
    return db.collection("juegos").updateOne({ _id: new ObjectId(id) }, { $set: datos })
}

// Esta función es opcional, basada en el modelo del profesor, por si la usas luego
export async function getRecomendacionesXJuego(id){
    try {
        const juego = await getJuegoById(id)
        return juego.aparece || []
    } catch (error) {
        return null
    }
}
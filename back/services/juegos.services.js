//Archivo: back/services/juegos.services.js
import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

// Helper para obtener la colección de forma limpia usando la conexión única
const db = {
    collection: (name) => getDB().collection(name)
}

/**
 * Obtiene la lista de juegos aplicando filtros avanzados.
 * @param {object} filter - Objeto con los criterios de búsqueda (query params).
 */
export async function getJuegos( filter = {} ) {
    // 1. Filtro base: Excluir los eliminados (Soft Delete)
    const filterMongo = { eliminado: { $ne: true } }

    // 2. Filtros de igualdad (Editorial y Categoría)
    if( filter.editorial != undefined ){
        filterMongo.editorial = { $eq: filter.editorial }
    }
    
    if( filter.categoria != undefined ){
        filterMongo.categoria = { $eq: filter.categoria }
    }

    // 3. Filtros de Rango Numérico (Precio)
    if( filter.mayorQue != undefined ){
        filterMongo.precio = { $gte: parseInt(filter.mayorQue) }
    }

    if( filter.menorQue != undefined ){
        filterMongo.precio = { $lte: parseInt( filter.menorQue ) }
    }

    if( filter.menorQue != undefined && filter.mayorQue != undefined ){
        filterMongo.$and = [ { precio: { $lte: parseInt( filter.menorQue ) } }, { precio: { $gte: parseInt(filter.mayorQue) } } ]
    }

    // 4. Filtro de Texto (Buscador por nombre usando Regex)
    if( filter.nombre != undefined ){
        filterMongo.nombre = { $regex: filter.nombre, $options: 'i' }
    }

    return db.collection("juegos").find(filterMongo).toArray()
}

/**
 * Busca un juego por su ID de MongoDB.
 */
export async function getJuegoById(id) {
    return db.collection("juegos").findOne({ _id: new ObjectId(id) })
}

/**
 * Inserta un nuevo juego en la colección.
 */
export function guardarJuego(juego){
    return db.collection("juegos").insertOne(juego)
}

/**
 * PUT: Reemplaza TODO el documento del juego.
 * Útil cuando se envía el formulario completo de edición.
 */
export async function editarJuego(id, juego){
    return db.collection("juegos").replaceOne({ _id: new ObjectId(id)}, juego)
}

/**
 * DELETE: Soft Delete (Borrado Lógico).
 * Marca el juego como eliminado para que no aparezca en listas, pero no lo borra físicamente.
 */
export function borrarJuego(id){
    console.log("Borrando juego ID:", id)
    return db.collection("juegos").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

/**
 * PATCH: Actualización Parcial.
 * Actualiza solo los campos que vienen en el objeto, manteniendo el resto igual.
 */
export function actualizarJuego(juego){
    // Separa el ID de los datos a actualizar para no intentar sobreescribir el _id
    const { id, ...datos } = juego
    return db.collection("juegos").updateOne({ _id: new ObjectId(id) }, { $set: datos })
}


//Archivo: back/services/token.services.js
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb"
import { getDB } from "./database.service.js"

const db = {
    collection: (name) => getDB().collection(name)
}

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_rolera"

/**
 * Genera el token JWT.
 */
export async function createToken(usuario) {

    const payload = { 
        _id: usuario._id.toString(), 
        email: usuario.email 
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })

    // Guardamos la sesión en la base de datos (Token + ID de usuario)
    await db.collection("tokens").updateOne(
        { usuarioId: new ObjectId(usuario._id) }, 
        { $set: { usuarioId: new ObjectId(usuario._id), token: token } }, 
        { upsert: true }
    )

    return token
}

/**
 * Valida el token verificando la firma y la existencia en la base de datos.
 */
export async function validateToken(token){
    try {
        const payload = jwt.verify(token, SECRET_KEY)

        const session = await db.collection("tokens").findOne({ 
            token: token, 
            usuarioId: new ObjectId(payload._id)
        })

        if (!session) throw new Error("Token invalido (sesión no encontrada)")

        return payload

    } catch (error) {
        throw new Error(error.message)
    }
}
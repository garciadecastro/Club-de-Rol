import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb"
import { db } from "../server.js"

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_rolera"

export async function createToken(usuario) {
    // Eliminamos datos sensibles antes de meterlos al token
    const payload = { 
        ...usuario, 
        password: undefined, 
        // Si tuvieras passwordConfirm también lo quitaríamos
    }

    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '2h'
    })

    // Guardamos el token en la colección 'tokens' para controlar la sesión
    // Usamos updateOne con upsert: true para que si el usuario ya tiene token, se actualice el viejo
    await db.collection("tokens").updateOne(
        { usuarioId: new ObjectId(usuario._id) }, 
        { $set: { usuarioId: new ObjectId(usuario._id), token: token } }, 
        { upsert: true }
    )

    return token
}

export async function validateToken(token){
    try {
        // 1. Verificamos la firma criptográfica (y la fecha de expiración automáticamente)
        const payload = jwt.verify(token, SECRET_KEY)

        // 2. Verificamos que el token siga activo en la base de datos
        // (Esto sirve para invalidar tokens si el usuario cierra sesión manualmente)
        const session = await db.collection("tokens").findOne({ 
            token: token, 
            usuarioId: new ObjectId(payload._id) 
        })

        if( !session ) throw new Error("Token invalido (sesión no encontrada)")

        return payload

    } catch (error) {
        throw new Error(error.message)
    }
}
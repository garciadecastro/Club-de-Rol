import bcrypt from 'bcrypt'
import { createToken } from "./token.services.js"
// CAMBIO: Importamos desde el archivo independiente para romper el círculo
import { getDB } from "./database.service.js"
import jwt from 'jsonwebtoken'

// Truco para mantener el resto del código igual
const db = {
    collection: (name) => getDB().collection(name)
}

export async function registrar(jugador){
    // Verificamos si ya existe el email en la colección 'jugadores'
    const existe = await db.collection("jugadores").findOne({email: jugador.email})
    
    if( existe ) throw new Error("No se pudo registrar el jugador (El email ya existe)")

    // Preparamos el objeto nuevo, quitando la password plana y confirmación
    const nuevoJugador = { 
        ...jugador, 
        password: undefined, 
        passwordConfirm: undefined,
        juegosFavoritos: [] // Inicializamos el array de favoritos
    }

    // Encriptamos la contraseña
    nuevoJugador.password = await bcrypt.hash(jugador.password, 10)

    // Guardamos en Mongo
    await db.collection("jugadores").insertOne(nuevoJugador)

    // Devolvemos el usuario sin la contraseña encriptada
    return {...nuevoJugador, password: undefined}
}

export async function login(credenciales){
    // Buscamos el usuario
    const jugador = await db.collection("jugadores").findOne({email: credenciales.email})
    
    if( !jugador ) throw new Error("Credenciales inválidas")

    // ⚠️ CORRECCIÓN DE SEGURIDAD: Validamos que la contraseña coincida
    const esValida = await bcrypt.compare(credenciales.password, jugador.password)
    
    if( !esValida ) throw new Error("Credenciales inválidas")

    // Generamos el token usando tu servicio de tokens
    const token = await createToken(jugador)
    
    // Retornamos los datos limpios + el token
    return { ...jugador, password: undefined, passwordConfirm: undefined, token }
}

/* Dejo esta función preparada basada en el modelo del profesor,
   por si descomentas la ruta de recuperar contraseña en el futuro.
*/
export async function restablecerContrasenia(tokenEmail, password){
    const payload = jwt.verify(tokenEmail, "RECUPERAR")
    const email = payload.email

    const existe = await db.collection("jugadores").findOne({email: email})
    if( !existe ) throw new Error("No se pudo restablecer")

    await db.collection("jugadores").updateOne({email: email}, {
        $set: { password: await bcrypt.hash(password, 10) }
    })

    return "OK"
}
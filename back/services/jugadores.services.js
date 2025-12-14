//Archivo: back/services/jugadores.services.js
import bcrypt from "bcrypt";
import { createToken } from "./token.services.js";
import { getDB } from "./database.service.js";
import { ObjectId } from "mongodb";

const db = {
    collection: (name) => getDB().collection(name)
};

/**
 * Registra un nuevo usuario en el sistema.
 */
export async function registrar(jugador) {
    const existe = await db.collection("jugadores").findOne({ email: jugador.email });
    if (existe) throw new Error("El email ya está registrado");

    const nuevo = {
        nombre: jugador.nombre,
        email: jugador.email,
        password: await bcrypt.hash(jugador.password, 10),
        juegosFavoritos: []
    };

    await db.collection("jugadores").insertOne(nuevo);
    return { ...nuevo, password: undefined };
}

/**
 * Realiza el Login del usuario.
 */
export async function login(data) {
    const jugador = await db.collection("jugadores").findOne({ email: data.email });
    if (!jugador) throw new Error("Credenciales inválidas");

    const ok = await bcrypt.compare(data.password, jugador.password);
    if (!ok) throw new Error("Credenciales inválidas");

    const token = await createToken(jugador);
    return { ...jugador, password: undefined, token };
}

/**
 * Actualiza los datos del jugador.
 */
export async function actualizarJugador(id, datos) {
    const col = db.collection("jugadores");
    const jugador = await col.findOne({ _id: new ObjectId(id) });
    if (!jugador) throw new Error("Jugador no encontrado");

    const set = {};
    if (datos.nombre) set.nombre = datos.nombre;
    if (datos.email) set.email = datos.email;
    if (datos.password) set.password = await bcrypt.hash(datos.password, 10);

    await col.updateOne({ _id: new ObjectId(id) }, { $set: set });
    return { ...jugador, ...set, password: undefined };
}

/**
 * Elimina la cuenta del jugador.
 */
export async function eliminarJugador(id) {
    const col = db.collection("jugadores");
    const jugador = await col.findOne({ _id: new ObjectId(id) });
    if (!jugador) throw new Error("Jugador no encontrado");
    await col.deleteOne({ _id: new ObjectId(id) });
    return true;
}

/**
 * Obtiene lista pública de jugadores.
 */
export async function getJugadoresPublicos() {
    return db.collection("jugadores")
        .find({}) 
        .project({ password: 0, passwordConfirm: 0, juegosFavoritos: 0 }) 
        .toArray()
}

/**
 * Obtiene un jugador por ID filtrando datos sensibles.
 */
export async function obtenerJugadorPorId(id) {
    return db.collection("jugadores").findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0, passwordConfirm: 0 } }
    );
}

/**
 * Busca al usuario por email y le actualiza la contraseña (ya hasheada).
 */
export async function cambiarPasswordPorEmail(email, password) {
    // Encriptamos la nueva contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.collection("jugadores").updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
    );
}
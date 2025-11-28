//Archivo: back/services/jugadores.services.js
import bcrypt from "bcrypt";
import { createToken } from "./token.services.js";
import { getDB } from "./database.service.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const db = {
    collection: (name) => getDB().collection(name)
};

/**
 * Registra un nuevo usuario en el sistema.
 */
export async function registrar(jugador) {
    // Verificamos si el email ya existe para evitar duplicados
    const existe = await db.collection("jugadores").findOne({ email: jugador.email });
    if (existe) throw new Error("El email ya está registrado");

    const nuevo = {
        nombre: jugador.nombre,
        email: jugador.email,
        // Encriptamos la contraseña
        // Nunca se guarda texto plano.
        password: await bcrypt.hash(jugador.password, 10),
        juegosFavoritos: []
    };

    await db.collection("jugadores").insertOne(nuevo);

    // Devolvemos el objeto usuario SIN la contraseña (buena práctica de seguridad)
    return { ...nuevo, password: undefined };
}

/**
 * Realiza el Login del usuario.
 * 1. Busca el usuario.
 * 2. Compara la contraseña encriptada.
 * 3. Genera el Token JWT.
 */
export async function login(data) {
    const jugador = await db.collection("jugadores").findOne({ email: data.email });
    if (!jugador) throw new Error("Credenciales inválidas");

    // Comparamos la password que viene del front con el hash de la BD
    const ok = await bcrypt.compare(data.password, jugador.password);
    if (!ok) throw new Error("Credenciales inválidas");

    // Generamos el token de sesión llamando al servicio de tokens
    const token = await createToken(jugador);

    return { ...jugador, password: undefined, token };
}

/**
 * Actualiza los datos del jugador.
 * Si el usuario envía una nueva contraseña, la volvemos a encriptar.
 */
export async function actualizarJugador(id, datos) {
    const col = db.collection("jugadores");
    const jugador = await col.findOne({ _id: new ObjectId(id) });
    if (!jugador) throw new Error("Jugador no encontrado");

    const set = {};
    if (datos.nombre) set.nombre = datos.nombre;
    if (datos.email) set.email = datos.email;
    
    // Si hay cambio de contraseña, se hashea de nuevo
    if (datos.password) set.password = await bcrypt.hash(datos.password, 10);

    await col.updateOne({ _id: new ObjectId(id) }, { $set: set });

    return { ...jugador, ...set, password: undefined };
}

/**
 * Elimina la cuenta del jugador permanentemente.
 */
export async function eliminarJugador(id) {
    const col = db.collection("jugadores");
    const jugador = await col.findOne({ _id: new ObjectId(id) });
    if (!jugador) throw new Error("Jugador no encontrado");

    await col.deleteOne({ _id: new ObjectId(id) });

    return true;
}

/**
 * Obtiene la lista de todos los jugadores del club.
 * Excluye campos sensibles para el listado público.
 */
export async function getJugadoresPublicos() {
    return db.collection("jugadores")
        .find({}) 
        .project({ password: 0, passwordConfirm: 0, juegosFavoritos: 0 }) 
        .toArray()
}
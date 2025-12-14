//Archivo: back/services/database.service.js
import { MongoClient } from 'mongodb';

// -------------------------------------------------------------------------
// URL DE CONEXIÓN A MONGODB ATLAS (NUBE)
// He puesto tu usuario 'admin' y la contraseña 'rol1234'.
// Si cambiaste la contraseña, edita donde dice 'rol1234' por la tuya.
// -------------------------------------------------------------------------
const url = "mongodb+srv://admin:rol12345@hibridas.3sxrdj2.mongodb.net/?appName=hibridas";

// NOMBRE DE TU BASE DE DATOS
const dbName = "AH20232CP1"; 

const client = new MongoClient(url);
let db = null;

/**
 * Conecta a la base de datos de Atlas.
 */
export async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log(`✅ Conectado a MongoDB Atlas: ${dbName}`);
    } catch (error) {
        console.error('❌ Error fatal conectando a Mongo:', error);
        // Si falla la conexión, detenemos el servidor para no causar errores en cadena
        process.exit(1);
    }
}

/**
 * Devuelve la conexión activa.
 */
export function getDB() {
    if (!db) {
        throw new Error('La base de datos no está inicializada todavía.');
    }
    return db;
}
//Archivo: back/services/database.service.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Creamos el cliente usando la dirección guardada en el archivo .env
const client = new MongoClient(process.env.MONGO_URI);
let db = null;

/**
 * Función asíncrona para iniciar la conexión.
 * Se debe llamar una sola vez al arrancar el servidor (en index.js o server.js).
 */
export async function connectDB() {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log(`✅ Conectado a MongoDB: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error('❌ Error fatal conectando a Mongo:', error);
        // Si no hay base de datos, matamos el proceso porque la API no puede funcionar sin ella.
        process.exit(1);
    }
}

/**
 * Devuelve la instancia de la base de datos ya conectada.
 * Los servicios (campanas, juegos, etc.) llaman a esto para hacer sus consultas.
 */
export function getDB() {
    if (!db) {
        throw new Error('La base de datos no está inicializada todavía.');
    }
    return db;
}
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db = null;

export async function connectDB() {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log(`✅ Conectado a MongoDB: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error('❌ Error fatal conectando a Mongo:', error);
        process.exit(1);
    }
}

export function getDB() {
    if (!db) {
        throw new Error('La base de datos no está inicializada todavía.');
    }
    return db;
}
//Archivo: back/server.js
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './services/database.service.js';

// RUTAS (Todas activas)
import jugadoresApiRoute from './api/routes/jugadores.api.routes.js';
import JuegosApiRoute from './api/routes/juegos.api.routes.js';
import CampanasApiRoute from './api/routes/campanas.api.routes.js';
import PartidasApiRoute from './api/routes/partidas.api.routes.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 2025;

/**
 * Configuración de CORS.
 */
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, PATCH, DELETE"
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Permite recibir JSON en el body de las peticiones

/**
 * Función principal de arranque.
 * Asegura que la DB esté conectada antes de escuchar peticiones.
 */
async function startServer() {
    // 1. Conectamos la BD
    await connectDB();

    // 2. Activamos Swagger (si aplica)
    // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
    
    // 3. Activamos TODAS las rutas del Club de Rol
    app.use("/api/jugadores", jugadoresApiRoute);
    app.use("/api/juegos", JuegosApiRoute);
    app.use("/api/campanas", CampanasApiRoute);
    app.use("/api/partidas", PartidasApiRoute);

    // 4. Arrancamos
    app.listen(port, () => console.log(`✅ Servidor completo en puerto ${port}`));
}

startServer();
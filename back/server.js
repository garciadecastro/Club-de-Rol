import express from "express";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// import jugadoresApiRoute from './api/routes/jugadores.api.routes.js';
// import CampanasApiRoute from './api/routes/campanas.api.routes.js';
// import PartidasApiRoute from './api/routes/partidas.api.routes.js';
// import ComentariosApiRoute from './api/routes/comentarios.api.routes.js';

// import swaggerUI from 'swagger-ui-express';
// import swaggerJSON from './swagger.output.json' with { type: 'json' };

dotenv.config();

const app = express();
const port = process.env.PORT || 2025;

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, PATCH, DELETE"
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function startServer() {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log(`✅ Conectado a MongoDB: ${process.env.DB_NAME}`);

        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
        
        // app.use("/api/jugadores", jugadoresApiRoute);
        // app.use("/api/campanas", CampanasApiRoute);
        // app.use("/api/partidas", PartidasApiRoute);
        // app.use("/api/comentarios", ComentariosApiRoute);

        app.listen(port, () => console.log(`Servidor en puerto ${port}`));

    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

startServer();

export { db };
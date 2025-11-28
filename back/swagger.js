//Archivo: back/swagger.js
import swaggerAutogen from 'swagger-autogen'

/**
 * Configuración de la documentación de la API.
 */
const doc = {
    info: {
        title: "API Club de Rol",
        description: "API para gestión de jugadores, juegos, campañas y partidas."
    },
    host: 'localhost:2025',
    schemes: ['http']
}

const outFile = './swagger.output.json'

/**
 * Lista completa de archivos de rutas.
 */
const endpoints = [
    './api/routes/jugadores.api.routes.js',
    './api/routes/juegos.api.routes.js',
    './api/routes/campanas.api.routes.js',   
    './api/routes/partidas.api.routes.js',   

]

swaggerAutogen(outFile, endpoints, doc).then( () => console.log("Documentación Swagger generada con éxito.") )
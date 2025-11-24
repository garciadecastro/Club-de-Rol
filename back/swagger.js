import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: "API Club de Rol",
        description: "API para gestión de jugadores y juegos de rol"
    },
    host: 'localhost:2025',
    schemes: ['http']
}

const outFile = './swagger.output.json'
// Listamos los archivos de rutas que hemos creado
const endpoints = [
    './api/routes/jugadores.api.routes.js',
    './api/routes/juegos.api.routes.js'
]

swaggerAutogen(outFile, endpoints, doc).then( () => console.log("Documentación Swagger generada con éxito.") )
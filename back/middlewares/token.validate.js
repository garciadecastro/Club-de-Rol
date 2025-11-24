import * as tokenService from '../services/token.services.js'

export async function validateToken(req, res, next){
    try {        
        const auth = req.headers["authorization"] // Busca el header 'Authorization'
        if( !auth ) return res.status(401).json({ message: "Token no encontrado" })

        const [ bearer, token ] = auth.split(" ") // Separa "Bearer" del código largo

        if( bearer != "Bearer" && !token ) return res.status(401).json({ message: "Formato de token invalido" })

        // Llama al servicio para verificar si el token es real y no ha expirado
        const usuario = await tokenService.validateToken(token)

        if( !usuario ) return res.status(401).json({ message: "Token invalido" })

        req.session = usuario // Guarda los datos del usuario en la petición para usarlo luego

        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
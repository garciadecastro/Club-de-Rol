//Archivo: back/middlewares/token.validate.js
import * as tokenService from '../services/token.services.js'

/**
 * Middleware de AUTORIZACIÓN.
 * Verifica el token enviado en los headers y, si es válido,
 */
export async function validateToken(req, res, next){
    try {        
        const auth = req.headers["authorization"]
        if (!auth) return res.status(401).json({ message: "Token no encontrado" })

        const [bearer, token] = auth.split(" ")

        
        // Si no dice "Bearer" O si no hay token, es un formato inválido.
        if (bearer !== "Bearer" || !token) {
            return res.status(401).json({ message: "Formato de token inválido" })
        }

        const usuario = await tokenService.validateToken(token)

        if (!usuario) return res.status(401).json({ message: "Token inválido" })

        req.session = usuario

        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
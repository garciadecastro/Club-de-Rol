import { jugadoresSchema, loginSchema } from "../schemas/jugadores.js";

// Fíjate que aquí se llama 'validateJugador' (singular), exactamente como lo pide la ruta
export async function validateJugador(req, res, next){
    try {
        const datosValidados = await jugadoresSchema.validate(req.body, {abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}

export async function validateLogin(req, res, next){
    try {
        const datosValidados = await loginSchema.validate(req.body, {abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}
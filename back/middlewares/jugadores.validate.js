//Archivo: back/middlewares/jugadores.validate.js
import { jugadoresSchema, loginSchema } from "../schemas/jugadores.js";

/**
 * Middleware que valida los datos para REGISTRAR un nuevo jugador.
 * Comprueba nombre, email y contraseña según las reglas del esquema.
 */

export async function validateJugador(req, res, next){
    try {
        const datosValidados = await jugadoresSchema.validate(req.body, {abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}

/**
 * Middleware que valida los datos para el LOGIN.
 * Solo deja pasar email y password si cumplen el formato básico.
 */
export async function validateLogin(req, res, next){
    try {
        const datosValidados = await loginSchema.validate(req.body, {abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}
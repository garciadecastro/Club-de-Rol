//Archivo: back/middlewares/juego.validate.js
import { juegosSchema } from "../schemas/juegos.js"

/**
 * Middleware para validar los datos de un juego antes de guardarlo.
 * Limpia los campos que no estén en el esquema (stripUnknown).
 */
export function validateJuego(req, res, next){
    
    juegosSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (datosValidados) => {
            // Actualizamos el body con los datos limpios (stripUnknown)
            req.body = datosValidados 
            next() 
        })
        .catch( (err) => res.status(400).json({message: err.errors}) )
}

/**
 * Valida que venga un ID en los parámetros de la ruta.
 */
export function validateId(req, res, next){
    if( req.params.id ){
        next()
    }else{
        res.status(400).json({message: "El id es obligatorio"})
    }
}
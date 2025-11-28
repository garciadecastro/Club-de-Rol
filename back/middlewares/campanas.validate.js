//Archivo: back/middlewares/campanas.validate.js
import { campanaSchema } from "../schemas/campanas.js"
import { ObjectId } from "mongodb"

/**
 * Middleware para validar los datos de una campaña.
 */
export function validateCampana(req, res, next){
    campanaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (datosValidados) => {
            req.body = datosValidados 
            next() 
        })
        .catch( (err) => res.status(400).json({message: err.errors}) )
}

/**
 * Valida si el ID proporcionado en la URL es un ObjectId válido de MongoDB.
 */
export function validateId(req, res, next){
    if( req.params.id && ObjectId.isValid(req.params.id) ){
        next()
    }else{
        res.status(400).json({message: "El ID es obligatorio y debe ser válido"})
    }
}
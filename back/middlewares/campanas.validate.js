import { campanaSchema } from "../schemas/campanas.js"
import { ObjectId } from "mongodb"

export function validateCampana(req, res, next){
    campanaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (datosValidados) => {
            req.body = datosValidados 
            next() 
        })
        .catch( (err) => res.status(400).json({message: err.errors}) )
}

export function validateId(req, res, next){
    if( req.params.id && ObjectId.isValid(req.params.id) ){
        next()
    }else{
        res.status(400).json({message: "El ID es obligatorio y debe ser válido"})
    }
}
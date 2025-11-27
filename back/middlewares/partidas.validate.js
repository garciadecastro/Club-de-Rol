import { partidaSchema } from "../schemas/partidas.js"
import { ObjectId } from "mongodb"

export function validatePartida(req, res, next){
    partidaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (datosValidados) => {
            req.body = datosValidados 
            next() 
        })
        .catch( (err) => res.status(400).json({message: err.errors}) )
}
import { comentarioSchema } from "../schemas/comentarios.js"

export function validateComentario(req, res, next){
    comentarioSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (datosValidados) => {
            req.body = datosValidados 
            next() 
        })
        .catch( (err) => res.status(400).json({message: err.errors}) )
}
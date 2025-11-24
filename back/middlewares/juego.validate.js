import { juegosSchema } from "../schemas/juegos.js"

export function validateJuego(req, res, next){
    // console.log("Validando......")
    juegosSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then( (datosValidados) => {
            // Actualizamos el body con los datos limpios (stripUnknown)
            req.body = datosValidados 
            next() 
        })
        .catch( (err) => res.status(400).json({message: err.errors}) )
}

export function validateId(req, res, next){
    if( req.params.id ){
        next()
    }else{
        res.status(400).json({message: "El id es obligatorio"})
    }
}
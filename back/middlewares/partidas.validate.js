//Archivo: back/middlewares/partidas.validate.js
import { partidaSchema } from "../schemas/partidas.js"
import { ObjectId } from "mongodb"

/**
 * Valida los datos de una Partida (fecha, hora, campaña, etc.)
 */
export function validatePartida(req, res, next){
    partidaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((datosValidados) => {
            req.body = datosValidados
            next()
        })
        .catch((err) => res.status(400).json({ message: err.errors }))
}

/**
 * Valida que el :id de la URL sea un ObjectId válido
 */
export function validateId(req, res, next){
    const { id } = req.params

    if (id && ObjectId.isValid(id)) {
        return next()
    }

    res.status(400).json({ message: "El ID es obligatorio y debe ser válido" })
}
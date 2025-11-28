//Archivo: back/api/controllers/partidas.api.controller.js
import * as services from "../../services/partidas.services.js"

/**
 * Crea una nueva partida (sesión de juego) en la base de datos.
 * @param {object} req - Datos de la partida en el body.
 * @param {object} res - Retorna la partida creada.
 */
export function crearPartida(req, res){
    services.crearPartida(req.body)
        .then( (resultado) => res.status(201).json(resultado) )
        .catch( err => res.status(500).json({message: "Error al crear partida", error: err}) )
}

/**
 * Obtiene todas las partidas asociadas a una campaña específica.
 * @param {object} req - El ID de la campaña viene en los parámetros de la URL.
 * @param {object} res - Devuelve la lista de partidas.
 */
export function getPartidasPorCampana(req, res){
    const idCampana = req.params.idCampana
    services.getPartidasPorCampana(idCampana)
        .then( partidas => res.status(200).json(partidas) )
        .catch( err => res.status(500).json({message: "Error al obtener partidas", error: err}) )
}

/**
 * Elimina una partida por su ID.
 * @param {object} req - El ID de la partida a eliminar viene en la URL.
 * @param {object} res - Mensaje de confirmación.
 */
export function deletePartida(req, res){
    const id = req.params.id
    services.borrarPartida(id)
        .then( (resultado) => res.status(200).json({message: "Partida eliminada"}) )
        .catch( (err) => res.status(500).json({message: "Error al eliminar", error: err}) )
}
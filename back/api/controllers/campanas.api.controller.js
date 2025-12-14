//Archivo: back/api/controllers/campanas.api.controller.js
import * as services from "../../services/campanas.services.js"

/**
 * Obtiene todas las campañas creadas por el usuario logueado.
 * @param {object} req - La petición HTTP con la sesión del usuario.
 * @param {object} res - La respuesta que enviará la lista de campañas.
 */
export function getCampanas(req, res){
    const usuarioId = req.session._id
    
    services.getCampanas(usuarioId)
        .then( campanas => res.status(200).json(campanas) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Obtiene campañas públicas (Mundo Abierto).
 */
export function getCampanasPublicas(req, res) {
    services.getCampanasPublicas()
        .then(campanas => res.status(200).json(campanas))
        .catch(err => res.status(500).json({ message: err.message || err }))
}

/**
 * Busca una campaña específica por ID.
 * Se eliminó la restricción estricta de "solo creador".
 * Ahora permite ver el detalle a cualquier usuario logueado.
 */
export function getCampanaById(req, res){
    const id = req.params.id
    services.getCampanaById(id)
        .then( campana => {
            if(campana){
                // Permitimos el paso. La seguridad visual (botones) la maneja el Frontend.
                res.status(200).json(campana)
            } else {
                res.status(404).json({message: "Campaña no encontrada"})
            }
        })
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Crea una nueva campaña con los datos recibidos.
 * Captura explícitamente juego_id y jugadores del formulario.
 */
export function createCampana(req, res){
    const campana = {
        titulo: req.body.titulo,
        sistema: req.body.sistema,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        juego_id: req.body.juego_id, 
        jugadores: req.body.jugadores || [], // Array de IDs (opcional, default vacío)
        creador_id: req.session._id 
    }

    services.crearCampana(campana)
        .then( (nuevaCampana) => res.status(201).json(nuevaCampana) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Edita una campaña existente.
 */
export function editarCampana(req, res){
    const id = req.params.id
    const campana = req.body 
    
    services.editarCampana(id, campana)
        .then( resultado => res.status(202).json(resultado) )
        .catch( err => res.status(500).json({message: "No se pudo actualizar la campaña"}) )
}

/**
 * Invita a un jugador a la campaña.
 * Se espera el ID del jugador en el body (POST).
 */
export function invitarJugador(req, res) {
    const idCampana = req.params.id
    const idJugador = req.body.idJugador 

    services.agregarJugador(idCampana, idJugador)
        .then((resultado) => res.status(200).json(resultado))
        .catch((err) => res.status(400).json({ message: err.message || err }))
}

/**
 * Elimina a un jugador de la campaña.
 * Se espera el ID del jugador en la URL (DELETE).
 */
export function expulsarJugador(req, res) {
    const idCampana = req.params.id
    const idJugador = req.params.idJugador 

    services.quitarJugador(idCampana, idJugador)
        .then(() => res.status(200).json({ message: "Jugador eliminado de la campaña" }))
        .catch((err) => res.status(500).json({ message: err.message || err }))
}

/**
 * Borra una campaña de la base de datos (Lógico).
 */
export function deleteCampana(req, res){
    const id = req.params.id
    services.borrarCampana(id)
        .then( (resultado) => res.status(202).json({message: `Campaña eliminada correctamente`}) )
        .catch( (err) => res.status(500).json({message: `No se pudo eliminar la campaña`, error: err}) )
}
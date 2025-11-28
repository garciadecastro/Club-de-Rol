//Archivo: back/api/controllers/juegos.api.controller.js
import * as services from "../../services/juegos.services.js"

/**
 * Devuelve la lista de juegos disponibles.
 * Permite filtrar por query params (ej: ?categoria=Rol).
 * @param {object} req - Petición con filtros opcionales en req.query.
 * @param {object} res - Respuesta con la lista de juegos.
 */
export function getJuegos(req, res){
    services.getJuegos(req.query)
        .then( juegos => res.status(200).json(juegos) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Busca un juego específico por su ID.
 * @param {object} req - Petición con el ID en la URL.
 * @param {object} res - Retorna el juego o un 404 si no existe.
 */
export function getJuegoById(req, res){
    const id = req.params.id
    services.getJuegoById(id)
        .then( juego => {
            if(juego){
                res.status(200).json(juego)
            } else {
                res.status(404).json({message: "Juego no encontrado"})
            }
        })
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Crea un nuevo juego en la base de datos.
 * @param {object} req - Body con los datos del juego.
 * @param {object} res - Respuesta con el juego creado.
 */
export function createJuego(req, res){
    const juego = {
        nombre: req.body.nombre,
        editorial: req.body.editorial,
        precio: req.body.precio,
        year: req.body.year,
        categoria: req.body.categoria,
        imagen: req.body.imagen
    }

    services.guardarJuego(juego)
        .then( (nuevoJuego) => res.status(201).json(nuevoJuego) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Elimina un juego por su ID.
 * @param {object} req - Petición con el ID a eliminar.
 * @param {object} res - Mensaje de confirmación.
 */
export function deleteJuego(req, res){
    const id = req.params.id
    services.borrarJuego(id)
        .then( (idBorrado) => res.status(202).json({message: `El juego con id:${idBorrado} se eliminó correctamente.`}) )
        .catch( (err) => res.status(500).json({message: `El juego con id:${id} NO se eliminó.`, error: err}) )
}

/**
 * Reemplaza completamente un juego existente
 * Se espera recibir todos los campos del objeto.
 * @param {object} req - Petición con ID y objeto completo.
 * @param {object} res - El juego actualizado.
 */
export function reemplazarJuego(req, res){
    const id = req.params.id
    const juego = {
        nombre: req.body.nombre,
        editorial: req.body.editorial,
        precio: req.body.precio,
        year: req.body.year,
        categoria: req.body.categoria,
        imagen: req.body.imagen
    }
    
    services.editarJuego(id, juego)
        .then( juegoEditado => res.status(202).json(juegoEditado) )
        .catch( err => res.status(500).json({message: "No se pudo reemplazar el juego."}) )
}

/**
 * Actualiza parcialmente un juego
 * Solo se modifican los campos enviados en el body.
 * @param {object} req - Petición con ID y campos a cambiar.
 * @param {object} res - El juego actualizado.
 */
export function actualizarJuego(req, res){
    const id = req.params.id
    
    const juego = {
        id: id,
        ...req.body 
    }
    
    services.actualizarJuego(juego)
        .then( juegoEditado => res.status(202).json(juegoEditado) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}
//Archivo: back/api/controllers/campanas.api.controller.js
import * as services from "../../services/campanas.services.js"

/**
 * Obtiene todas las campañas creadas por el usuario logueado.
 * @param {object} req - La petición HTTP con la sesión del usuario.
 * @param {object} res - La respuesta que enviará la lista de campañas.
 */
export function getCampanas(req, res){
    // Saco el ID del usuario de la sesión para filtrar solo sus campañas
    const usuarioId = req.session._id
    
    services.getCampanas(usuarioId)
        .then( campanas => res.status(200).json(campanas) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}


export function getCampanasPublicas(req, res) {
    services.getCampanasPublicas()
        .then(campanas => res.status(200).json(campanas))
        .catch(err => res.status(500).json({ message: err.message || err }))
}


/**
 * Busca una campaña específica por ID y verifica permisos.
 * @param {object} req - La petición con el ID en los parámetros.
 * @param {object} res - La respuesta con la campaña encontrada.
 */
export function getCampanaById(req, res){
    const id = req.params.id
    services.getCampanaById(id)
        .then( campana => {
            if(campana){
                // Verifico si el usuario que pide ver esto es realmente el dueño
                if(campana.creador_id.toString() !== req.session._id.toString()){

                    return res.status(403).json({message: "No tienes permiso para ver esta campaña"})
                }
                res.status(200).json(campana)
            } else {
                res.status(404).json({message: "Campaña no encontrada"})
            }
        })
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Crea una nueva campaña con los datos recibidos.
 * @param {object} req - El body contiene los datos del formulario.
 * @param {object} res - Devuelve la campaña creada.
 */
export function createCampana(req, res){
    const campana = {
        titulo: req.body.titulo,
        sistema: req.body.sistema,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        // Asigno el creador automáticamente usando el token de sesión
        creador_id: req.session._id 
    }

    services.crearCampana(campana)
        .then( (nuevaCampana) => res.status(201).json(nuevaCampana) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

/**
 * Edita una campaña existente.
 * @param {object} req - Petición con ID y nuevos datos.
 * @param {object} res - Respuesta de la actualización.
 */
export function editarCampana(req, res){
    const id = req.params.id
    const campana = req.body 
    
    services.editarCampana(id, campana)
        .then( resultado => res.status(202).json(resultado) )
        .catch( err => res.status(500).json({message: "No se pudo actualizar la campaña"}) )
}

/**
 * Borra una campaña de la base de datos.
 * @param {object} req - Petición con el ID de la campaña a borrar.
 * @param {object} res - Mensaje de confirmación.
 */
export function deleteCampana(req, res){
    const id = req.params.id
    services.borrarCampana(id)
        .then( (resultado) => res.status(202).json({message: `Campaña eliminada correctamente`}) )
        .catch( (err) => res.status(500).json({message: `No se pudo eliminar la campaña`, error: err}) )
}
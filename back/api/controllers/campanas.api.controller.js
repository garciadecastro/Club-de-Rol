import * as services from "../../services/campanas.services.js"

export function getCampanas(req, res){
    // Obtenemos el ID del usuario desde el token (req.session)
    const usuarioId = req.session._id
    
    services.getCampanas(usuarioId)
        .then( campanas => res.status(200).json(campanas) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

export function getCampanaById(req, res){
    const id = req.params.id
    services.getCampanaById(id)
        .then( campana => {
            if(campana){
                // Validación extra: ¿Esta campaña pertenece al usuario que la pide?
                // Convertimos a string para comparar
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

export function createCampana(req, res){
    const campana = {
        titulo: req.body.titulo,
        sistema: req.body.sistema,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        // IMPORTANTE: Asignamos el dueño automáticamente desde el token
        creador_id: req.session._id 
    }

    services.crearCampana(campana)
        .then( (nuevaCampana) => res.status(201).json(nuevaCampana) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

export function editarCampana(req, res){
    const id = req.params.id
    const campana = req.body // Ya viene validado y limpio por el middleware
    
    services.editarCampana(id, campana)
        .then( resultado => res.status(202).json(resultado) )
        .catch( err => res.status(500).json({message: "No se pudo actualizar la campaña"}) )
}

export function deleteCampana(req, res){
    const id = req.params.id
    services.borrarCampana(id)
        .then( (resultado) => res.status(202).json({message: `Campaña eliminada correctamente`}) )
        .catch( (err) => res.status(500).json({message: `No se pudo eliminar la campaña`, error: err}) )
}
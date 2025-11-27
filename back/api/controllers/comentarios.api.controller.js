import * as services from "../../services/comentarios.services.js"

export function crearComentario(req, res){
    // Pasamos el body y el usuario (req.session) que viene del token
    services.crearComentario(req.body, req.session)
        .then( (resultado) => res.status(201).json(resultado) )
        .catch( err => res.status(500).json({message: "Error al comentar", error: err}) )
}

export function getComentariosPorPartida(req, res){
    const idPartida = req.params.idPartida
    services.getComentariosPorPartida(idPartida)
        .then( comentarios => res.status(200).json(comentarios) )
        .catch( err => res.status(500).json({message: "Error al obtener comentarios", error: err}) )
}

export function deleteComentario(req, res){
    const id = req.params.id
    services.borrarComentario(id)
        .then( (resultado) => res.status(200).json({message: "Comentario eliminado"}) )
        .catch( (err) => res.status(500).json({message: "Error al eliminar", error: err}) )
}
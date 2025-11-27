import * as services from "../../services/partidas.services.js"

export function crearPartida(req, res){
    services.crearPartida(req.body)
        .then( (resultado) => res.status(201).json(resultado) )
        .catch( err => res.status(500).json({message: "Error al crear partida", error: err}) )
}

export function getPartidasPorCampana(req, res){
    const idCampana = req.params.idCampana
    services.getPartidasPorCampana(idCampana)
        .then( partidas => res.status(200).json(partidas) )
        .catch( err => res.status(500).json({message: "Error al obtener partidas", error: err}) )
}

export function deletePartida(req, res){
    const id = req.params.id
    services.borrarPartida(id)
        .then( (resultado) => res.status(200).json({message: "Partida eliminada"}) )
        .catch( (err) => res.status(500).json({message: "Error al eliminar", error: err}) )
}
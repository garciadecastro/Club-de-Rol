import * as services from "../../services/juegos.services.js"

export function getJuegos(req, res){
    // Pasamos req.query por si quieres filtrar (ej: ?categoria=fantasía)
    services.getJuegos(req.query)
        .then( juegos => res.status(200).json(juegos) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}

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

export function createJuego(req, res){
    // Mapeamos los campos exactos de tu base de datos
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

export function deleteJuego(req, res){
    const id = req.params.id
    services.borrarJuego(id)
        .then( (idBorrado) => res.status(202).json({message: `El juego con id:${idBorrado} se eliminó correctamente.`}) )
        .catch( (err) => res.status(500).json({message: `El juego con id:${id} NO se eliminó.`, error: err}) )
}

export function reemplazarJuego(req, res){
    const id = req.params.id
    // PUT: Reemplaza todo el objeto, necesitamos todos los campos
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

export function actualizarJuego(req, res){
    const id = req.params.id
    // PATCH: Actualización parcial, mezclamos lo que viene con el ID
    const juego = {
        id: id,
        ...req.body 
    }
    
    services.actualizarJuego(juego)
        .then( juegoEditado => res.status(202).json(juegoEditado) )
        .catch( err => res.status(500).json({message: err.message || err}) )
}
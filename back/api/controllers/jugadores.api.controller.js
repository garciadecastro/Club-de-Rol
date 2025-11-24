import * as services from '../../services/jugadores.services.js';

export function registrar(req, res) {
    // El profesor pasa solo el body, así que el servicio se encargará de buscar la DB
    services.registrar(req.body)
        .then((jugador) => res.status(201).json(jugador))
        .catch((err) => res.status(400).json({ message: err.message || err }));
}

export function login(req, res) {
    services.login(req.body)
        .then((usuario) => res.status(200).json(usuario))
        .catch((err) => res.status(400).json({ message: err.message || err }));
}

/* Dejamos preparadas estas funciones por si en el futuro las implementas, 
   siguiendo el esquema del profesor, aunque por ahora no son críticas para registrarse.
*/

// export function recuperarCuenta(req, res) { ... }
// export function restablecerContrasenia(req, res) { ... }
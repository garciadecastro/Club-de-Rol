//Archivo: back/api/controllers/jugadores.api.controller.js
import * as services from "../../services/jugadores.services.js";
import * as emailServices from "../../services/email.services.js"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt"; 

// ------------------------------------
// FUNCIONES DE MANEJO DE SESIÓN Y PERFIL
// ------------------------------------

export function registrar(req, res) {
    services.registrar(req.body)
        .then(jugador => res.status(201).json(jugador))
        .catch(err => res.status(400).json({ message: err.message }));
}

export function login(req, res) {
    services.login(req.body)
        .then(usuario => res.status(200).json(usuario))
        .catch(err => res.status(400).json({ message: err.message }));
}

export function actualizar(req, res) {
    services.actualizarJugador(req.params.id, req.body)
        .then(jugador => res.json(jugador))
        .catch(err => res.status(400).json({ message: err.message }));
}

export function eliminar(req, res) {
    services.eliminarJugador(req.params.id)
        .then(() => res.json({ message: "Cuenta eliminada" }))
        .catch(err => res.status(400).json({ message: err.message }));
}

// ------------------------------------
// FUNCIONES DE RECUPERACIÓN (Públicas)
// ------------------------------------

export function recuperarPassword(req, res) {
    const email = req.body.email;
    
    emailServices.enviarMailRecuperacion(email)
        .then( () => res.status(200).json({message: "Correo enviado"}) )
        .catch( err => res.status(500).json({message: "Error al enviar correo", error: err}) )
}

export async function restablecerPassword(req, res) {
    const { token, password } = req.body;

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!payload.email) {
            return res.status(400).json({ message: "Token inválido (sin email)" });
        }

        await services.cambiarPasswordPorEmail(payload.email, password); 

        res.status(200).json({ message: "Contraseña actualizada con éxito" });

    } catch (error) {
        return res.status(400).json({ message: "El enlace ha expirado o es inválido." });
    }
}

// -------------------------
// FUNCIÓN: LISTAR JUGADORES 
// -------------------------

export function getJugadoresPublicos(req, res) {
    services.getJugadoresPublicos()
        .then(jugadores => res.status(200).json(jugadores))
        .catch(err => res.status(500).json({ message: err.message || err }))
}
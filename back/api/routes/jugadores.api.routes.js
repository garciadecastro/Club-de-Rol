//Archivo: back/api/routes/jugadores.api.routes.js
import express from "express";
import * as controllers from "../controllers/jugadores.api.controller.js";
import { validateJugador, validateLogin } from "../../middlewares/jugadores.validate.js";
import { validateToken } from "../../middlewares/token.validate.js";

const router = express.Router();

// Rutas Públicas (Registro, Login, Recuperación)
router.post("/", validateJugador, controllers.registrar);
router.post("/login", validateLogin, controllers.login);
router.post("/recuperar-cuenta", controllers.recuperarPassword); 
router.post("/restablecer-contrasenia", controllers.restablecerPassword);

// Ruta para obtener todos los jugadores (La Taberna).
router.get("/publicos", controllers.getJugadoresPublicos);

// Rutas protegidas
router.put("/:id", [validateToken], controllers.actualizar);
router.delete("/:id", [validateToken], controllers.eliminar);

export default router;
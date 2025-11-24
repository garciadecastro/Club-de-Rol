import express from "express"
import * as controllers from "../controllers/jugadores.api.controller.js"
// Importamos las validaciones (que crearemos enseguida)
import { validateJugador, validateLogin } from "../../middlewares/jugadores.validate.js"

const router = express.Router()

// POST /api/jugadores -> Registra un nuevo jugador
router.post("/", [validateJugador], controllers.registrar)

// POST /api/jugadores/login -> Inicia sesión
router.post("/login", [validateLogin], controllers.login)

// Estas las dejo comentadas porque aún no tenemos la lógica en el controlador, 
// pero respeto la estructura del profesor por si quieres añadirlas luego:
// router.post("/recuperar-cuenta", controllers.recuperarCuenta)
// router.post("/restablecer-contrasenia", controllers.restablecerContrasenia)

export default router
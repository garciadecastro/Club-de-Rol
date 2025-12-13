//Archivo: back/api/routes/campanas.api.routes.js
import express from "express"
import * as controllers from "../controllers/campanas.api.controller.js"
import { validateCampana, validateId } from "../../middlewares/campanas.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()

// ------------------------------------------
// RUTA PÚBLICA (Mundo Abierto). NO requiere Token.
// ------------------------------------------
router.get("/publicas", controllers.getCampanasPublicas)


// ------------------------------------------
// RUTAS PRIVADAS. TODAS requieren Token.
// ------------------------------------------
router.get("/", [validateToken], controllers.getCampanas)
router.get("/:id", [validateToken, validateId], controllers.getCampanaById)

// Creación y Edición básica
router.post("/", [validateToken, validateCampana], controllers.createCampana)
router.put("/:id", [validateToken, validateId, validateCampana], controllers.editarCampana)

// Gestión de Jugadores (NUEVAS RUTAS)
// POST para invitar (el ID del jugador va en el body)
router.post("/:id/invitar", [validateToken, validateId], controllers.invitarJugador)

// DELETE para expulsar (el ID del jugador va en la URL para ser RESTful)
router.delete("/:id/jugadores/:idJugador", [validateToken, validateId], controllers.expulsarJugador)

// Borrado de campaña
router.delete("/:id", [validateToken, validateId], controllers.deleteCampana)

export default router
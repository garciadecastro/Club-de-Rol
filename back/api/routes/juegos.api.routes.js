import express from "express"
import * as controllers from "../controllers/juegos.api.controller.js"
// Estos middlewares los crearemos en el siguiente paso:
import { validateId, validateJuego } from "../../middlewares/juego.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()

// Endpoint para obtener todos los juegos (permite filtros por query)
router.get("/", [validateToken], controllers.getJuegos)

// Endpoint para obtener un juego por ID
router.get("/:id", [validateToken, validateId], controllers.getJuegoById)

// Endpoint para crear un nuevo juego (POST)
router.post("/", [validateJuego, validateToken], controllers.createJuego)

// Endpoint para eliminar un juego (Soft delete)
router.delete("/:id", [validateToken, validateId], controllers.deleteJuego)

// Endpoint para reemplazar un juego completo (PUT)
router.put("/:id", [validateToken, validateId], controllers.reemplazarJuego)

// Endpoint para actualizar parcialmente un juego (PATCH)
router.patch("/:id", [validateToken, validateId], controllers.actualizarJuego)

export default router
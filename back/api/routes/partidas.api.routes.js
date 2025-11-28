//Archivo: back/api/routes/partidas.api.routes.js
import express from "express"
import * as controllers from "../controllers/partidas.api.controller.js"
import { validatePartida } from "../../middlewares/partidas.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"
import { validateId } from "../../middlewares/partidas.validate.js"

const router = express.Router()

/**
 * Rutas de Partidas.
 */
router.post("/", [validateToken, validatePartida], controllers.crearPartida)

router.get("/campana/:idCampana", [validateToken], controllers.getPartidasPorCampana)

router.delete("/:id", [validateToken, validateId], controllers.deletePartida)

export default router
import express from "express"
import * as controllers from "../controllers/partidas.api.controller.js"
import { validatePartida } from "../../middlewares/partidas.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"
import { validateId } from "../../middlewares/juego.validate.js" // Reutilizamos validar ID

const router = express.Router()

router.post("/", [validateToken, validatePartida], controllers.crearPartida)
router.get("/campana/:idCampana", [validateToken], controllers.getPartidasPorCampana)
router.delete("/:id", [validateToken, validateId], controllers.deletePartida)

export default router
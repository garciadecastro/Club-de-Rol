import express from "express"
import * as controllers from "../controllers/campanas.api.controller.js"
import { validateCampana, validateId } from "../../middlewares/campanas.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()

// TODAS las rutas de campañas requieren estar logueado (validateToken)

router.get("/", [validateToken], controllers.getCampanas)
router.get("/:id", [validateToken, validateId], controllers.getCampanaById)
router.post("/", [validateToken, validateCampana], controllers.createCampana)
router.put("/:id", [validateToken, validateId, validateCampana], controllers.editarCampana)
router.delete("/:id", [validateToken, validateId], controllers.deleteCampana)

export default router
//Archivo: back/api/routes/juegos.api.routes.js
import express from "express"
import * as controllers from "../controllers/juegos.api.controller.js"
import { validateId, validateJuego } from "../../middlewares/juego.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()

// ------------------------------------------
// RUTAS DE JUEGOS (CRUD)
// ------------------------------------------

router.get("/", [validateToken], controllers.getJuegos)

router.post("/", [validateToken, validateJuego], controllers.createJuego)

router.get("/:id", [validateToken, validateId], controllers.getJuegoById)

router.put("/:id", [validateToken, validateId, validateJuego], controllers.reemplazarJuego)

router.patch("/:id", [validateToken, validateId, validateJuego], controllers.actualizarJuego)

router.delete("/:id", [validateToken, validateId], controllers.deleteJuego)


export default router
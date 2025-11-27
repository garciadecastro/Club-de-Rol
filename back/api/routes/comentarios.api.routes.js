import express from "express"
import * as controllers from "../controllers/comentarios.api.controller.js"
import { validateComentario } from "../../middlewares/comentarios.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"
import { validateId } from "../../middlewares/juego.validate.js"

const router = express.Router()

// POST: Crear comentario
router.post("/", [validateToken, validateComentario], controllers.crearComentario)

// GET: Ver comentarios de una partida específica
router.get("/partida/:idPartida", [validateToken], controllers.getComentariosPorPartida)

// DELETE: Borrar comentario
router.delete("/:id", [validateToken, validateId], controllers.deleteComentario)

export default router
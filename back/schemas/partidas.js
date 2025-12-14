//Archivo: back/schemas/partidas.js
import yup from 'yup'

/**
 * Esquema para las Partidas (sesiones de juego).
 */
export const partidaSchema = yup.object({
    titulo: yup.string()
        .required("El título es obligatorio"),

    fecha: yup.string()
        .required("La fecha es obligatoria")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD"),

    resumen: yup.string()
        .optional(),

    campana_id: yup.string()
        .required("La partida debe pertenecer a una campaña")
})
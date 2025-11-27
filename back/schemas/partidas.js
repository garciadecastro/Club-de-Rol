import yup from 'yup'

export const partidaSchema = yup.object({
    titulo: yup.string().required("El título es obligatorio"),
    fecha: yup.date().required("La fecha es obligatoria").typeError("Debe ser una fecha válida"),
    resumen: yup.string().optional(), // Notas de la sesión
    campana_id: yup.string().required("La partida debe pertenecer a una campaña")
})
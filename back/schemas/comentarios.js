import yup from 'yup'

export const comentarioSchema = yup.object({
    texto: yup.string().required("El comentario no puede estar vacío").max(280, "Máximo 280 caracteres"),
    partida_id: yup.string().required("El ID de la partida es obligatorio")
})
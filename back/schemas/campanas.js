import yup from 'yup'

export const campanaSchema = yup.object({
    titulo: yup.string().required("El título es obligatorio").min(3, "El título debe tener al menos 3 caracteres"),
    sistema: yup.string().required("El sistema de juego es obligatorio (ej: D&D, Vampiro)"),
    descripcion: yup.string().optional().max(500, "La descripción no puede superar los 500 caracteres"),
    imagen: yup.string().url("Debe ser una URL válida").optional()
})
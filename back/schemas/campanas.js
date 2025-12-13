//Archivo: back/schemas/campanas.js
import yup from 'yup'

/**
 * Esquema de validación para las Campañas.
 * Incluye juego_id y lista de jugadores (max 6).
 */
export const campanaSchema = yup.object({
    titulo: yup.string()
        .required("El título es obligatorio")
        .min(3, "El título debe tener al menos 3 caracteres"),

    sistema: yup.string()
        .required("El sistema de juego es obligatorio"),

    descripcion: yup.string()
        .optional()
        .max(500, "La descripción no puede superar los 500 caracteres"),

    imagen: yup.string()
        .url("Debe ser una URL válida")
        .optional(),

    // Usamos juego_id para mantener consistencia con MongoDB
    juego_id: yup.string()
        .required("Debes seleccionar un juego"),

    jugadores: yup.array()
        .of(yup.string()) // IDs de los jugadores
        .max(6, "La campaña ya está completa (máximo 6 jugadores)")
        .default([])
})
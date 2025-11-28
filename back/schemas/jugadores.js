//Archivo: back/schemas/jugadores.js
import yup from 'yup'

/**
 * Esquema de validación para el REGISTRO de usuarios.
 * Incluye reglas complejas para la contraseña (regex).
 */
export const jugadoresSchema = yup.object({
    // Agrego nombre porque tu controlador lo pide para registrar
    nombre: yup.string().required("El nombre es un campo requerido").min(3, "El nombre debe tener al menos 3 caracteres"),

    // El resto es idéntico a tu modelo
    email: yup.string().email("Debe ser un mail valido").typeError("Debe ser un mail valido").required("El email es requerido"),
    
    password: yup.string().required("La contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres")
                    .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
                    .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
                    .matches(/[a-z]/, "La contraseña debe tener al menos una minuscula")
                    .matches(/[@!$%&=?¿]/, "La contraseña debe tener al menos un caracter especial"),
    
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben ser iguales").required("La confirmación de contraseña es requerida")
})

/**
 * Esquema simplificado solo para el LOGIN.
 */
export const loginSchema = yup.object({
    email: yup.string().email("Debe ser un mail valido").typeError("Debe ser un mail valido").required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida")
})
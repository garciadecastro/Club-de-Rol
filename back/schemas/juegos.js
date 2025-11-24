import yup from 'yup'

export const juegosSchema = yup.object({
    nombre: yup.string().required("El nombre es un campo requerido").min(3, "El nombre como minimo debe tener 3 caracteres").max(50, "El nombre como maximo debe tener 50 caracteres"),
    
    editorial: yup.string().required("La editorial es un campo requerido").min(3, "La editorial como minimo debe tener 3 caracteres"),
    
    precio: yup.number().typeError("Precio debe ser un numero").required("Precio es un campo requerido").positive("Precio debe ser positivo"),
    
    year: yup.number().typeError("Año debe ser un numero").required("Año es un campo requerido").integer("El año debe ser un numero entero"),
    
    categoria: yup.string().required("La categoria es un campo requerido"),
    
    imagen: yup.string().required("La imagen es un campo requerido").url("Debe ser una URL valida"),
    
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{24}$/, "No es un id de mongo db")
})
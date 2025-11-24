import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL_USER, // Lo tomamos del .env
        pass: process.env.EMAIL_PASS  // Lo tomamos del .env
    }
})

export async function enviarMailRecuperacion(email){
    console.log("Intentando enviar email a: ", email)
    
    // Generamos un token específico para recuperación (dura 1 hora)
    const tokenEmail = jwt.sign({email}, "RECUPERAR", {expiresIn: "1h"})

    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperar contraseña - Club de Rol",
        html: `<p>Hacé click en el siguiente link para recuperar tu cuenta en el Club de Rol: <a href='http://localhost:5173/restablecer-contrasenia/${tokenEmail}' >Recuperar Contraseña</a></p>`,
        text: `Hacé click en el siguiente link para recuperar tu cuenta: http://localhost:5173/restablecer-contrasenia/${tokenEmail}`
    }

    return transport.sendMail(emailOptions)
}
//Archivo: back/services/email.services.js
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async function enviarMailRecuperacion(email){
    console.log("Intentando enviar email a: ", email)
    
    const tokenEmail = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"})

    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperar contraseña - Club de Rol",
        html: `<p>Click para recuperar tu cuenta:
        <a href='${process.env.FRONTEND_URL}/restablecer-contrasenia/${tokenEmail}'>
        Recuperar Contraseña</a></p>`
    }

    return transport.sendMail(emailOptions)
}

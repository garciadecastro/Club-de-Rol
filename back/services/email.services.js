import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "carlosgarciadecastro@gmail.com",
        pass: "tmldbardnvgmncrr" // Tu App Password (sin espacios)
    }
})

export async function enviarMailRecuperacion(email){
    console.log("Intentando enviar email a: ", email)
    
    // Usamos la clave "RECUPERAR" igual que el profesor
    const tokenEmail = jwt.sign({email}, "RECUPERAR", {expiresIn: "1h"})

    // URL hardcodeada a localhost
    const url = `http://localhost:5173/restablecer-contrasenia/${tokenEmail}`

    const emailOptions = {
        from: "carlosgarciadecastro@gmail.com",
        to: email,
        subject: "Recuperar contraseña - Club de Rol",
        html: `<p>Haz click en el siguiente link para recuperar tu cuenta: <a href='${url}'>Recuperar Contraseña</a></p>`,
        text: `Haz click en el siguiente link para recuperar tu cuenta: ${url}`
    }

    return transport.sendMail(emailOptions)
}
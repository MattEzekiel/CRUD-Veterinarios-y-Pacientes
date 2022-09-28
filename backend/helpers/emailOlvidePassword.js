import nodemailer from 'nodemailer';

const emailOlvidePassword = async datos => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Enviar email
    const { email, nombre, token } = datos;

    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Restablece tu contraseña",
        text: "Restablece tu contraseña",
        html: `<p>Hola: ${nombre}, Han solicitado restablecer su contraseña.</p>
                <p>Siga el siguiente enlace <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a></p>
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
                `
    });

    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailOlvidePassword;
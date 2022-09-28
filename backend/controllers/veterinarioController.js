import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { email, nombre } = req.body;

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({email});

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        // Guardar nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // Enviar email al usuario
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado['token']
        });

        res.json(veterinarioGuardado);
    } catch (e) {
        console.log(e);
    }
}

const perfil = (req, res) => {
    const { veterinario } = req;

    res.json(veterinario);
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});

    if( !usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({ msg: 'Usuario Confirmado'} );
    } catch (e) {
        console.log(e);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si existe
    const usuario = await Veterinario.findOne({email});

    if (!usuario) {
        const error = new Error('Usuario no existe');
        return res.status(403).json({ msg: error.message });
    }

    // Confirmar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error('Su cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el password
    if (!await usuario.comprobarPassword(password)) {
        const error = new Error('La contraseña es incorrecta');
        return res.status(403).json({ msg: error.message });
    }

    // Autenticar
    usuario.token = generarJWT(usuario.id);
    res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({email});

    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    try {
        existeVeterinario.token = generarID();
        await existeVeterinario.save();

        // Enviar Email con instrucciones
        emailOlvidePassword({
           email,
           nombre: existeVeterinario['nombre'],
           token: existeVeterinario['token']
        });

        res.json({ msg: 'Le hemos enviado un email con las instrucciones' });
    } catch (e) {
        console.log(e);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({token});

    if (!tokenValido) {
        const error = new Error('El usuario no es válido');
        return res.status(400).json({ msg: error.message});
    } else {
        res.json({ msg: 'Token válido' });
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({token});
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Contraseña modificada correctamente" });
    } catch (e) {
        console.log(e);
    }
}

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    if (veterinario.email !== req.body.email) {
        const { email } = req.body
        const mailsExistente = await Veterinario.findOne({email});
        if (mailsExistente) {
            const error = new Error('Ese email ya está en uso');
            return res.status(400).json({ msg: error.message });
        }
    }

    try {
        veterinario.nombre = req.body.nombre || veterinario.nombre;
        veterinario.web = req.body.web;
        veterinario.telefono = req.body.telefono;
        veterinario.email = req.body.email || veterinario.email;

        const veterinarioActualizado = await veterinario.save();
        return res.json(veterinarioActualizado);
    } catch (error) {
        console.log(error)
    }
}

const actualizarPassword = async (req, res) => {
    const { id } = req.veterinario;
    const { password, repitePassword } = req.body;

    const veterinario = await Veterinario.findById(id);
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    if (await veterinario.comprobarPassword(password)) {

        veterinario.password = repitePassword;
        await veterinario.save()

        res.json({
            msg: 'Contraseña guardada correctamente'
        })

    } else {
        const error = new Error('La contraseña actual es incorrecta');
        return res.status(400).json({ msg: error.message });
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
};
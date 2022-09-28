import Paciente from "../models/Paciente.js";

const agregarPacientes = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado);
    } catch (e) {
        console.log(e);
    }
}
const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params ;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({ msg: 'Paciente no encontrado' })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Acción no válida' });
    }

    res.json(paciente);
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params ;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({ msg: 'Paciente no encontrado' })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Acción no válida' });
    }

    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        return res.json(pacienteActualizado);
    } catch (e) {
        console.log(e)
    }
}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params ;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({ msg: 'Paciente no encontrado' })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Acción no válida' });
    }

    try {
        await paciente.deleteOne()
        res.json({ msg: 'Paciente eliminado' });
    } catch (e) {
        console.log(e)
    }
}

export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}
import express from "express";
const router = express.Router();
import {
    actualizarPaciente,
    agregarPacientes,
    eliminarPaciente,
    obtenerPaciente,
    obtenerPacientes
} from "../controllers/PacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

router.route('/')
    .post(checkAuth, agregarPacientes)
    .get(checkAuth, obtenerPacientes);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;
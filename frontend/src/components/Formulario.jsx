import {useEffect, useState} from "react";
import Alerta from "./Alerta.jsx";
import usePacientes from "../hooks/usePacientes.jsx";

function Formulario() {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);


    const handleSubmit = e => {
      e.preventDefault();

      // Validar el formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            return setAlerta({
                msg: 'Todos los mensajes son obligatorios',
                error: true
            });
        }

        setAlerta({
            msg: 'Guardado correctamente'
        });

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null)

        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    }

    const { msg } = alerta;

    return (
        <>
            <p className={"text-lg text-center mb-10"}>
                Añade tus pacientes y <span className={"text-indigo-600 font-bold"}>Administralos</span>
            </p>
            <form
                className={"bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"}
                onSubmit={handleSubmit}
            >
                <div className={"mb-5"}>
                    <label
                        htmlFor={"nombre"}
                        className={"text-gray-700 uppercase font-bold"}
                    >Nombre</label>
                    <input
                        type={"text"}
                        id={"nombre"}
                        name={"nombre"}
                        placeholder={"Nombre de la mascota"}
                        className={"border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className={"mb-5"}>
                    <label
                        htmlFor={"propietario"}
                        className={"text-gray-700 uppercase font-bold"}
                    >Propietario</label>
                    <input
                        type={"text"}
                        id={"propietario"}
                        name={"propietario"}
                        placeholder={"Nombre del propietario"}
                        className={"border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"}
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className={"mb-5"}>
                    <label
                        htmlFor={"email"}
                        className={"text-gray-700 uppercase font-bold"}
                    >Email</label>
                    <input
                        type={"email"}
                        id={"email"}
                        name={"email"}
                        placeholder={"Email del propietario"}
                        className={"border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={"mb-5"}>
                    <label
                        htmlFor={"fecha"}
                        className={"text-gray-700 uppercase font-bold"}
                    >Fecha de alta</label>
                    <input
                        type={"date"}
                        id={"fecha"}
                        name={"fecha"}
                        placeholder={"Fecha del alta"}
                        className={"border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"}
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className={"mb-5"}>
                    <label
                        htmlFor={"sintomas"}
                        className={"text-gray-700 uppercase font-bold"}
                    >Síntomas</label>
                    <textarea
                        id={"sintomas"}
                        name={"sintomas"}
                        placeholder={"Describa los síntomas"}
                        rows={5}
                        className={"border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"}
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type={"submit"}
                    value={ id ? 'Guardar cambios' : "Agregar Paciente"}
                    className={"bg-indigo-600 text-white w-full p-3 uppercase font-bold hover:bg-indigo-700 hover:cursor-pointer rounded transition-colors"}
                />
            </form>
            { msg && (
                <div className={"mt-5"}>
                    <Alerta alerta={alerta} />
                </div>
            )}
        </>
    );
}

export default Formulario;
import usePacientes from "../hooks/usePacientes.jsx";

function Paciente({paciente}) {
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;
    const { setEdicion, eliminarPaciente } = usePacientes();

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-AR', {dateStyle: 'long'}).format(nuevaFecha);
    }

    return (
        <div className={"mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"}>
            <ul>
                <li className={"font-bold uppercase text-indigo-700 my-2"}>Nombre: <span className={"font-semibold normal-case text-black"}>{nombre}</span></li>
                <li className={"font-bold uppercase text-indigo-700 my-2"}>Propietario: <span className={"font-semibold normal-case text-black"}>{propietario}</span></li>
                <li className={"font-bold uppercase text-indigo-700 my-2"}>Email de contacto: <span className={"font-semibold normal-case text-black"}>{email}</span></li>
                <li className={"font-bold uppercase text-indigo-700 my-2"}>Fecha: <span className={"font-semibold normal-case text-black"}>{formatearFecha(fecha)}</span></li>
                <li className={"font-bold uppercase text-indigo-700 my-2"}>Sintomas: <span className={"font-semibold normal-case text-black"}>{sintomas}</span></li>
            </ul>
            <div className={"flex justify-between my-5"}>
                <button
                    type={"button"}
                    className={"py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg hover:cursor-pointer"}
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>
                <button
                    type={"button"}
                    className={"py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg hover:cursor-pointer"}
                    onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Paciente;
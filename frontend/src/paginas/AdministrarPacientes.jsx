import Formulario from "../components/Formulario.jsx";
import ListadoPacientes from "../components/ListadoPacientes.jsx";
import {useState} from "react";

function AdministrarPacientes() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (
        <div className={"flex flex-col md:flex-row"}>
            <button
                type={"button"}
                className={"bg-indigo-600 text-white font-bold uppercase mx-10 p-5 rounded-md mb-10 md:hidden"}
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
                { !mostrarFormulario ? 'Mostrar' : 'Ocultar' } formulario
            </button>
            <div
                className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}
            >
                <Formulario />
            </div>
            <div className={"md:w-1/2 lg:w-3/5"}>
                <ListadoPacientes />
            </div>
        </div>
    );
}

export default AdministrarPacientes;
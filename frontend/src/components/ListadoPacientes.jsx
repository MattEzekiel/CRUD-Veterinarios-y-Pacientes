import usePacientes from "../hooks/usePacientes.jsx";
import paciente from "./Paciente.jsx";
import Paciente from "./Paciente.jsx";

function ListadoPacientes() {
    const { pacientes } = usePacientes();

    return (
        <>
            { pacientes.length ?
                (<>
                    <h2 className={"font-black text-3xl text-center"}>Listado pacientes</h2>
                    <p className={"text-xl mt-5 mb-10 text-center"}>Administra tus <span className={"text-indigo-600 font-bold"}>pacientes y listas</span></p>
                    {
                        pacientes.map((paciente, index) => (
                            <Paciente
                                key={paciente._id ?? index}
                                paciente={paciente}
                            />
                        ))
                    }
                </>)
                :
                (<>
                    <h2 className={"font-black text-3xl text-center"}>No hay pacientes</h2>
                    <p className={"text-xl mt-5 mb-10 text-center"}>Comienza agregando pacientes <span className={"text-indigo-600 font-bold"}>y aparecerá aquí</span></p>
                </>)
            }
        </>
    );
}

export default ListadoPacientes;
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

function Header() {
    const { cerrarSesion } = useAuth();
    return (
        <header className={"py-10 bg-indigo-600"}>
            <div className={"container mx-auto flex flex-col lg:flex-row justify-between items-center"}>
                <h1 className={"font-semibold text-2xl text-white text-center"}>Administrador de Pacientes de <span className={"font-bold"}>Veterinaria</span></h1>
                <nav className={"flex flex-col lg:flex-row items-center gap-5 mt-5 lg:mt-0"}>
                    <Link
                        to={"/admin"}
                        className={"text-white text-md uppercase font-semibold"}
                    >Pacientes</Link>
                    <Link
                        to={"/admin/perfil"}
                          className={"text-white text-md uppercase font-semibold"}
                    >Perfil</Link>
                    <button
                        type={"button"}
                        className={"text-white text-md uppercase font-semibold"}
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
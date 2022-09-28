import {Link} from "react-router-dom";

function AdminNav(props) {
    return (
        <nav className={"flex gap-3"}>
            <Link
                to={"/admin/perfil"}
                className={"font-bold uppercase text-gray-500"}
            >Perfil
            </Link>
            <Link
                to={"/admin/cambiar-password"}
                className={"font-bold uppercase text-gray-500"}
            >Cambiar contraseña
            </Link>
        </nav>
    );
}

export default AdminNav;
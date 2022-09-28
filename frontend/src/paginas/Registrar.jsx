import {Link} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

function Registrar() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            return setAlerta({msg: 'Hay campos vacíos', error: true});

        }

        if (password !== repetirPassword) {
            return setAlerta({msg: 'Los passwords no son iguales', error: true});
        }

        if (password.length < 8) {
            return setAlerta({msg: 'El password es muy corto, agregue mínimo 8 caracteres', error: true});
        }

        setAlerta({});

        // Crear el usuario en la api
        try {
            await clienteAxios.post('/veterinarios', {
                nombre,
                email,
                password
            });
            setAlerta({
                msg: 'Creado correctamente, confirma tu email',
                error: false
            })
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true});
        }
    }

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className={"text-indigo-600 font-black text-6xl"}>Crea tu cuenta y Administra <span className={"text-black"}>tus Pacientes</span></h1>
            </div>
            <div className={"mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"}>
                { msg && (
                    <Alerta
                        alerta={alerta}
                    />
                ) }
                <form
                    onSubmit={handleSubmit}
                >
                    <div className={"my-5"}>
                        <label
                            htmlFor={"nombre"}
                            className={"uppercase text-gray-600 block text-xl font-bold"}
                        >Nombre</label>
                        <input
                            type={"text"}
                            placeholder={"Tu nombre"}
                            className={"border rounded-xl w-full p-3 mt-3 bg-gray-50"}
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className={"my-5"}>
                        <label
                            htmlFor={"email"}
                            className={"uppercase text-gray-600 block text-xl font-bold"}
                        >Email</label>
                        <input
                            type={"email"}
                            placeholder={"Email de registro"}
                            className={"border rounded-xl w-full p-3 mt-3 bg-gray-50"}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={"my-5"}>
                        <label
                            htmlFor={"password"}
                            className={"uppercase text-gray-600 block text-xl font-bold"}
                        >Contraseña</label>
                        <input
                            type={"password"}
                            placeholder={"Tu contraseña"}
                            className={"border rounded-xl w-full p-3 mt-3 bg-gray-50"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={"my-5"}>
                        <label
                            htmlFor={"password-repite"}
                            className={"uppercase text-gray-600 block text-xl font-bold"}
                        >Contraseña</label>
                        <input
                            type={"password"}
                            placeholder={"Repita su contraseña"}
                            className={"border rounded-xl w-full p-3 mt-3 bg-gray-50"}
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type={"submit"}
                        value={"Registrarse"}
                        className={"bg-indigo-700 w-full py-3 text-white rounded-xl uppercase font-bold mt-5hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10 hover:cursor-pointer"}
                    />
                </form>
                <nav
                    className={"mt-5 lg:flex lg:justify-start lg:items-start flex-col"}
                >
                    <Link
                        to={"/"}
                        className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                    >¿Ya tienes cuenta? Inicia Sesión</Link>
                    <Link
                        to={"/olvide-password"}
                        className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                    >Olvidé mi contraseña</Link>
                </nav>
            </div>
        </>
    );
}

export default Registrar;
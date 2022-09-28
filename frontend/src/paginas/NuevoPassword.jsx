import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

function NuevoPassword() {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault();

        if (password.length < 8) {
            return setAlerta({
                msg: 'La contraseña debe contener al menos 8 caracteres',
                error: true
            });
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, {
                password
            });

            setPasswordModificado(true);

            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
          try {
              await clienteAxios(`/veterinarios/olvide-password/${token}`);
              setAlerta({
                  msg: 'Coloca tu nueva contraseña',
                  error: false
              });
              setTokenValido(true);
          } catch (error) {
              setAlerta({ msg: 'Hubo un error con el enlace', error: true});
          }
        }
        comprobarToken();
    }, []);

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className={"text-indigo-600 font-black text-6xl"}>Restablece tu contraseña y no pierdas el acceso a <span
                    className={"text-black"}>tus Pacientes</span></h1>
            </div>
            <div className={"mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"}>
                { msg && (
                    <Alerta
                        alerta={alerta}
                    />
                )}
                { tokenValido && (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className={"my-5"}>
                            <label
                                htmlFor={"password"}
                                className={"uppercase text-gray-600 block text-xl font-bold"}
                            >Nueva Contraseña</label>
                            <input
                                type={"password"}
                                placeholder={"Su nueva contraseña"}
                                className={"border rounded-xl w-full p-3 mt-3 bg-gray-50"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type={"submit"}
                            value={"Restablecer contraseña"}
                            className={"bg-indigo-700 w-full py-3 text-white rounded-xl uppercase font-bold mt-5hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10 hover:cursor-pointer"}
                        />
                    </form>
                )}
                { passwordModificado && (
                    <nav
                        className={"mt-5 lg:flex lg:justify-start lg:items-start flex-col"}
                    >
                        <Link
                            to={"/"}
                            className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                        >Ya puede iniciar sesión con su nueva contraseña</Link>
                    </nav>
                )}
            </div>
        </>
    )
}

export default NuevoPassword;
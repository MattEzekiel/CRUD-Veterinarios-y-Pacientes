import {Link} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";

function OlvidePassword() {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
      e.preventDefault();

      if (email === '' || email.length < 6) {
          setAlerta({ msg: 'El email es obligatorio', error: true });
          return;
      }

      try {
          const { data } = await clienteAxios.post('/veterinarios/olvide-password', {
              email
          });
          setAlerta({ msg: data.msg, error: false});

      } catch (error) {
          setAlerta({ msg: error.response.data.msg, error: true });
      }
    }

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className={"text-indigo-600 font-black text-6xl"}>Recupera tu Acceso y no Pierdas <span className={"text-black"}>tus Pacientes</span></h1>
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
                    <input
                        type={"submit"}
                        value={"Recuperar cuenta"}
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
                        to={"/registrar"}
                        className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                    >¿No tienes cuenta? Registrate</Link>
                </nav>
            </div>
        </>
    );
}

export default OlvidePassword;
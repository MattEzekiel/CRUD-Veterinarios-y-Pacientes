import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";

function Login() {
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
      e.preventDefault();

      if([email, password].includes('')) {
          return setAlerta({
              msg: 'Todos los campos son obligatorios',
              error: true
          });
      }

      try {
          const { data } = await clienteAxios.post('/veterinarios/login', {
              email,
              password
          });

          localStorage.setItem('token', data.token);
          setAuth(data);
          navigate('/admin');
      } catch (error) {
          console.log('Error:',error)
          setAlerta({
              msg: error.response.data.msg,
              error: true
          })
      }
    }

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className={"text-indigo-600 font-black text-6xl"}>Inicia Sesión y Administra tus <span className={"text-black"}>Pacientes</span></h1>
            </div>
            <div className={"mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"}>
                { msg && (
                    <Alerta
                        alerta={alerta}
                    />
                )}
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
                    <input
                        type={"submit"}
                        value={"Iniciar Sesión"}
                        className={"bg-indigo-700 w-full py-3 text-white rounded-xl uppercase font-bold mt-5hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10 hover:cursor-pointer"}
                    />
                </form>
                <nav
                    className={"mt-5 lg:flex lg:justify-start lg:items-start flex-col"}
                >
                    <Link
                        to={"/registrar"}
                        className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                    >¿No tienes cuenta? Registrate</Link>
                    <Link
                        to={"/olvide-password"}
                        className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                    >Olvidé mi contraseña</Link>
                </nav>
            </div>
        </>
    );
}

export default Login;
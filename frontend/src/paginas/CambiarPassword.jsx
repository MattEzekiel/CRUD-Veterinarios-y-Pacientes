import AdminNav from "../components/AdminNav.jsx";
import Alerta from "../components/Alerta.jsx";
import {useState} from "react";
import useAuth from "../hooks/useAuth.jsx";

function CambiarPassword() {
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        password: '',
        repitePassword: ''
    });
    const { guardarPassword } = useAuth();

    const handleSubmit = async e => {
      e.preventDefault();

      if (Object.values(password).some(campo => campo === '')) {
         return setAlerta({
             msg: 'Todos los campos son obligatorios',
             error: true
         });
      }

      if (password.password.length < 8) {
          return setAlerta({
              msg: 'La contraseña debe tener como mínimo 8 caracteres',
              error: true
          });
      }

      const respuesta = await guardarPassword(password);
      setAlerta(respuesta);

    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />
            <h2 className={"font-black text-3xl text-center mt-10"}>Cambiar Contraseña</h2>
            <p className={"text-xl mt-5 mb-10 text-center"}>Modifica tu <span className={"text-indigo-600 font-bold"}>contraseña aquí</span></p>
            <div className={"flex justify-center"}>
                <div className={"w-full md:w-1/2 bg-white shadow rounded-lg p-5"}>
                    { msg && (<Alerta alerta={alerta} />) }
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label htmlFor="password" className="uppercase font-bold text-gray-600">Contraseña actual</label>
                            <input
                                type="password"
                                className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                id={"password"}
                                name={"password"}
                                placeholder={"Contraseña actual aquí"}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="repitePassword" className="uppercase font-bold text-gray-600">Nueva contraseña</label>
                            <input
                                type={"password"}
                                className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                id={"repitePassword"}
                                name={"repitePassword"}
                                placeholder={"Nueva contraseña"}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <input
                            type={"submit"}
                            className={"bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg mt-5 uppercase w-full hover:bg-indigo-800 hover:cursor-pointer"}
                            value={"Actualizar contraseña"}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default CambiarPassword;
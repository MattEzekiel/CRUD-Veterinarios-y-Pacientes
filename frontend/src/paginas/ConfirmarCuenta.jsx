import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

function ConfirmarCuenta() {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`;
                const { data } = await clienteAxios(url);

                setCuentaConfirmada(true);
                console.log('data:',data);
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

            setCargando(false);
        }
        confirmarCuenta();
    }, []);

    return (
        <>
            <div>
                <h1 className={"text-indigo-600 font-black text-6xl"}>Confirma tu cuenta y Comienza a Administrar <span className={"text-black"}>tus Pacientes</span></h1>
            </div>
            <div className={"mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"}>
                {!cargando && (
                    <Alerta
                        alerta={alerta}
                    />
                )}
                {cuentaConfirmada && (
                    <Link
                        to={"/"}
                        className={"block text-center my-3 text-gray-500 hover:text-gray-600"}
                    >Iniciar Sesión</Link>
                )}
            </div>
        </>
    );
}

export default ConfirmarCuenta;
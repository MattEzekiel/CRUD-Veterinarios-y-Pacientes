import AdminNav from "../components/AdminNav.jsx";
import useAuth from "../hooks/useAuth.jsx";
import {useEffect, useState} from "react";
import Alerta from "../components/Alerta.jsx";

function EditarPerfil() {
    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleSubmit = async e => {
      e.preventDefault();

      if ([perfil.nombre, perfil.email].includes('')) {
          return setAlerta({
              msg: 'El email y el nombre son obligatorios',
              error: true
          });
      }

      const resultado = await actualizarPerfil(perfil);
      setAlerta(resultado);
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />
            <h2 className={"font-black text-3xl text-center mt-10"}>Editar Perfil</h2>
            <p className={"text-xl mt-5 mb-10 text-center"}>Información de <span className={"text-indigo-600 font-bold"}>su perfil</span></p>
            <div className={"flex justify-center"}>
                <div className={"w-full md:w-1/2 bg-white shadow rounded-lg p-5"}>
                    { msg && (<Alerta alerta={alerta} />) }
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type="text"
                                className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                id={"nombre"}
                                name={"nombre"}
                                placeholder={"Cambie su nombre aquí"}
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input
                                type="text"
                                className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                id={"web"}
                                name={"web"}
                                placeholder={"Agregue/Cambie su web aquí"}
                                value={perfil['web'] || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input
                                type="tel"
                                className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                id={"telefono"}
                                name={"telefono"}
                                placeholder={"Cambie su teléfono aquí"}
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                id={"email"}
                                name={"email"}
                                placeholder={"Cambie su email aquí"}
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <input
                            type={"submit"}
                            className={"bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg mt-5 uppercase w-full hover:bg-indigo-800 hover:cursor-pointer"}
                            value={"Guardar Cambios"}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditarPerfil;
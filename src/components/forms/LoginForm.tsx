import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { login } from "../../services/usuario.service.ts"
import { UsuarioModel } from '../../model/Usuario.ts';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

let renderCount = 0;
const inputStyle = "w-full py-2 border-4 border-blue-400 text-gray-700 " +
    "rounded-lg hover:bg-blue-100 focus:outline-none " + 
    "focus:ring-2 focus:ring-blue-400"
const buttonStyle = "w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"


export const LoginForm = () => {
    //form es el objeto que contiene el estado del formulario
    const form = useForm<UsuarioModel>();
    const navigate = useNavigate();
    //control contiene informacion usada para la depuracion
    //register es un objeto que se usa para registrar atributos del formulario
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    renderCount++;
    const loginSubmit = async (data: UsuarioModel) => {
        try {
            const response = await login(data);
            console.log("response")
            console.log(response)
            if (response.status === 200) {
                navigate('/home');
                console.log("success")

            } else if (response.status === 'Client error') {
                console.log("client error")
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = (data: UsuarioModel) => {
        console.log("form submit", data);
        loginSubmit(data);
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="pl-10 pr-10 pt-20 pb-30 bg-white rounded-lg">
                <h1 className="text-3xl flex text-blue-600 justify-center items-center mb-10">Iniciar Sesión</h1>
                {/*noValidate desabilita la validacion por html para que funcione con las
            validaciones de useForm*/}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="nombre_usuario">Nombre Usuario</label>
                    <input
                        className={inputStyle}
                        type="text"
                        id="nombre_usuario"
                        {...register("nombre_usuario", {
                            //Reglas de validacion
                            required: "El nombre de usuario es obligatorio",
                            //pattern: {
                            ////TODO hacer el regex
                            //value: /^[a-zA-Z0-9]$/,
                            //message: "El nombre no cumple con el formato"
                            //},
                            //custom validation
                            validate: {
                                //como key se agrega el nombre de la validacion,
                                //se entrega como argumento (fieldvalue) el valor del input
                                //en el return se entrega un boolean || "mensaje" donde el 
                                //mensaje solo se muestra cuando la condicion es falsa,
                                //es decir que esta es la funcion que se debe cumplir para que 
                                //el formulario sea valido
                                //notAdmin: (fieldValue) => {
                                //return (false || "Hola");
                                //},
                            }
                        })}
                    />
                    <p style={{ color: "red" }}>{errors.nombre_usuario?.message}</p>

                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="clave_usuario">Contraseña</label>
                    <input
                        className={`${inputStyle} mb-4`}
                        //password es para ocultar la contraseña con asteriscos
                        type="password"
                        id="clave_usuario"
                        {...register("clave_usuario")}
                    //TODO agregar validaciones de serguridad min, simbolo, numero, etc
                    />
                    <p style={{ color: "red" }}>{errors.clave_usuario?.message}</p>

                    <button className={`${buttonStyle}`}>Iniciar Sesión</button>
                </form>
                <p className="text-gray-700">
                    ¿No tienes cuenta?
                    <Link to="/registrar" className="text-blue-400 ml-2 hover:text-blue-600">
                    Registrate aqui!</Link></p>
            </div>
            <DevTool control={control} />
        </div>
    )
}



//@ts-ignore, porque importamos javascript
import axios from './root.service.js';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import usuarioModel from '../model/usuario.ts';

export async function login(dataUser : usuarioModel) {
    console.log("login")
    try {
        const response = await axios.post('/auth/loguear', {
            nombre_usuario: dataUser.nombre_usuario, 
            clave_usuario: dataUser.clave_usuario
        });
        const { status, data } = response;
        if (status === 200) {
            const decodedToken = jwtDecode(data.data);
            console.log("decodedToken")
            console.log(decodedToken)
            const userData = { 
                //El nombre de usuario en el jwt esta guardado en subject
                //TODO: agregar rol
                nombre_usuario: decodedToken.sub,
                rol_usuario: 1
            };
            sessionStorage.setItem('usuario', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            cookies.set('jwt-auth', data.data, {path:'/'});
            return response
        }
    } catch (error: any) {
        //TODO: encontrar el tipo del error
        console.log(error)
        return error.response.data;
    }
}
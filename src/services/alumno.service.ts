//@ts-ignore, porque importamos javascript
import myaxios from "./root.service.js";
import axios from 'axios'
import ReturnValue from "../model/ReturnValue.js";
import ResponseEntity from "../model/ResponseEntity.js";


//notas de axiosError

//Lo importante de AxiosError es que contiene 
//message : string
//y contiene response<T, D>
//a su vez la response contiene data
//de tipo T y D es para la configuracion lo cual no usamos

//TODO creo que deberia devolver la response no la returnValue
export async function getAlumnosService(): Promise<ResponseEntity> {
    try {
        const { data } = await myaxios.get('/alumno')
        console.log("response: axios");
        const response = data;
        console.log(response);
        return response;
        //Los errores solo pueden ser de tipo any o unkown
    }catch(error : unknown){
        //type guard, al retornar positivo error va a ser de tipo
        //axios error por lo que typescript hace su trabajo
        if(axios.isAxiosError<ResponseEntity>(error)) {
            //TODO: que hace la ?, algo con nulos?
            if(error.response !== null && error.response !== undefined) {
                console.log(error.response.data);
                return {data: {alumnos: []}, message: "Error en el fetch"};
            }
            return {data: {alumnos: []}, message: "Error en el fetch"};
        }
    }
    return {data: { alumnos: []}, message: "¿?"};
}
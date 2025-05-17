//@ts-ignore, porque importamos javascript
import myaxios from "./root.service.js";
import axios from 'axios'
import ReturnValue from "../model/ReturnValue.js";
import ResponseEntity from "../model/ResponseEntity.js";
import Alumno from "../model/Alumno.js";


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
//No me convence del todo el catch, se podria refactorizar
export async function addAlumnosService(requestData : Alumno): Promise<ResponseEntity> {
    console.log("addAlumnosService");
    try {
        const { data } = await myaxios.post('/alumno', requestData);
        const response = data;
        console.log("response");
        console.log(response);
        return response;
    }catch(error : any){
        console.log("any error");
        console.log(error);
        //type guard, al retornar positivo error va a ser de tipo
        //axios error por lo que typescript hace su trabajo
        if(axios.isAxiosError<ResponseEntity>(error)) {
            //TODO: que hace la ?, algo con nulos?
            if(error.response !== null && error.response !== undefined) {
                console.log(error.response.data);
                console.log("nuevo mensaje en error.message")
                //TODO cambiar el message en el backend para que se vea el nombre
                //de uno de los errores o mejor la lista de todos los errores
                console.log(error.message);
                //entrega el error al hook
                throw error;
                //return {data: {alumnos: []}, message: error.message};
            }
            throw error;
            //return {data: {alumnos: []}, message: error.message};
            //return {data: {alumnos: []}, message: "Error en el fetch"};
        }
        throw error
        //return {data: { alumnos: [] }, message: "Error en la respuesta"}
    }
}

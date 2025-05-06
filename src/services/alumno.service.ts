//@ts-ignore, porque importamos javascript
import myaxios from "./root.service.js";
import { Alumno } from "../pages/Alumno.js";
import axios from 'axios'

type responseEntity = {
    data: Alumno[]
    message: string
}
type returnValue = {
    response: responseEntity | null
    error: string
}

//notas de axiosError

//Lo importante de AxiosError es que contiene 
//message : string
//y contiene response<T, D>
//a su vez la response contiene data
//de tipo T y D es para la configuracion lo cual no usamos

export async function getAlumnosService(): Promise<returnValue> {
    try {
        const { data } = await myaxios.get('/alumno')
        console.log("data: axios");
        console.log(data);
        return data;
        //Los errores solo pueden ser de tipo any o unkown
    }catch(error : unknown){
        //type guard, al retornar positivo error va a ser de tipo
        //axios error por lo que typescript hace su trabajo
        if(axios.isAxiosError<responseEntity>(error)) {
            //TODO: que hace la ?, algo con nulos?
            if(error.response !== null && error.response !== undefined) {
                console.log(error.response.data);
                return {response: null, error: error.message};
            }
            return {response: null, error: "no hay response"};
        }
    }
    return {response: null, error: "¿?"};
}
import { useEffect, useState } from "react";
//import { getAlumnosService } from "@services/alumno.service";
import { getAlumnosService } from "../services/alumno.service";

const useGetAlumnosService = () => {
    type Alumno = {
        id: number;
        nombre: string;
    };
    //Se define alumnos como un arr Alumno[]
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const fetchAlumnos = async () => {
        try {
            const data : Alumno[] = await getAlumnosService();
            console.log("data");
            console.log(data);
            setAlumnos(data);
        } catch (error) {
            console.error("Error fetching utensilios:", error);
        }
    };
    useEffect(() => {
        fetchAlumnos();
    }, []);

    return { alumnos, fetchAlumnos, setAlumnos };
};

export default useGetAlumnosService;


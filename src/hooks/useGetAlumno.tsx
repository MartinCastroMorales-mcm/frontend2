import { useState, useEffect } from 'react';
import { getAlumnosService } from '../services/alumno.service';
import ReturnValue from '../model/ReturnValue';
import Alumno from '../model/Alumno';
import ResponseEntity from '../model/ResponseEntity';

const useGetAlumnos = () => {
    const [alumnos, setAlumno] = useState<Alumno[]>([]);

    const fetchAlumno = async () => {
        try {
            console.log("hook alumnos");
            const response : ResponseEntity = await getAlumnosService();
            const data = response?.data;
            console.log("data")
            console.log(data);
            console.log("alumnos");
            console.log(data.alumnos);
            if(data === undefined) {
                setAlumno([]);
            }else {
                setAlumno(data.alumnos);
            }
        } catch (error) {
            console.error('Error fetching tipo utensilios:', error);
        }
    };

    useEffect(() => {
        fetchAlumno();
    }, []);

    return { alumnos, fetchAlumno, setAlumno };
};

export default useGetAlumnos;
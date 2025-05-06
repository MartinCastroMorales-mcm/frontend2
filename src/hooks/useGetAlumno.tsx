import { useState, useEffect } from 'react';
import { getAlumnosService } from '../services/alumno.service';
import { Alumno } from '../pages/Alumno';

const useGetAlumnos = () => {
    const [alumno, setAlumno] = useState([]);

    const fetchAlumno = async () => {
        try {
            const data : Alumno[] = await getAlumnosService();
            console.log("fetch tipo utensilio")
            //for(let i = 0; i < data.length; i++) {
                //data[i].nombre_tipo_utensilio = data[i].nombre_tipo_utensilio.charAt(0).toUpperCase() + data[i].nombre_tipo_utensilio.slice(1);
            //}
            data.map((item : any) => {
                item.nombre_tipo_utensilio = 
                item.nombre_tipo_utensilio.charAt(0).toUpperCase() + 
                item.nombre_tipo_utensilio.slice(1);
            })
            setAlumno(data );
        } catch (error) {
            console.error('Error fetching tipo utensilios:', error);
        }
    };

    useEffect(() => {
        fetchAlumno();
    }, []);

    return { alumno, , setTipoUtensilios };
};

export default useGetTipoUtensilio;
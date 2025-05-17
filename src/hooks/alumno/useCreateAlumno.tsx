import { useState } from 'react';
// @ts-ignore
import { showErrorAlert, showSuccessAlert } from '../../helpers/sweetAlert' //'../../helpers/sweetAlert.js';
import Alumno from '../../model/Alumno';
import { addAlumnosService } from '../../services/alumno.service';
import axios from 'axios';

const useCreateAlumno = (
    //Es el tipo retornado por la funcion useState
    setAlumnos: React.Dispatch<React.SetStateAction<Alumno[]>>, 
    //es el tipo de una funcion asincrona sin valor de retorno
    fetchAlumnos : () => Promise<void>) => {
    const [isCreatePopUpOpen, setIsCreatePopUpOpen] = useState(false);

    const handleClickCreate = () => {
        console.log("handleClickCreate");
        setIsCreatePopUpOpen(true);
    };

    const handleCreate = async (newAlumnoData : Alumno) => {
        console.log("handleCreate");
        if (newAlumnoData) {
            try {
                //Normalizar antes de enviar


                const response = await addAlumnosService(newAlumnoData);
                //console.log("response")
                //console.log(response);
                const alumnoCreado = response.data;
                showSuccessAlert('¡Usuario Creado!', 'El usuario se ha registrado correctamente.');
                //TODO: eliminar este any
                setAlumnos((prev: any) => [...prev, alumnoCreado]);

                // Actualizar alumnos en la base de datos
                await fetchAlumnos();
                setIsCreatePopUpOpen(false);
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                let errorMessage = 'Ocurrió un problema al crear el alumno.';
                if(axios.isAxiosError(error)) {
                    errorMessage = error.message;
                }                
                showErrorAlert('Error al crear usuario', errorMessage);
            }
        }
    };

    return {
        handleClickCreate,
        handleCreate,
        isCreatePopUpOpen,
        setIsCreatePopUpOpen,
    };
};

export default useCreateAlumno;
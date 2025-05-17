import { useState } from 'react';
// @ts-ignore
import { showErrorAlert, showSuccessAlert } from '../../helpers/sweetAlert' //'../../helpers/sweetAlert.js';
import Alumno from '../../model/Alumno';
import { addAlumnosService } from '../../services/alumno.service';

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
        if (newAlumnoData) {
            try {
                // Convierte id_horario_laboral a entero antes de enviarlo
                //const formattedData = {
                    //...newAlumnoData,
                    //id_horario_laboral: parseInt(newAlumnoData.id_horario_laboral, 10), // Convertir a entero
                //};
                const response = await addAlumnosService(newAlumnoData);
                const alumnoCreado = response.data.alumnos;
                showSuccessAlert('¡Usuario Creado!', 'El usuario se ha registrado correctamente.');
                //TODO: eliminar este any
                setAlumnos((prev: any) => [...prev, alumnoCreado]);

                // Actualizar alumnos en la base de datos
                await fetchAlumnos();
                setIsCreatePopUpOpen(false);
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                //const errorMessage = error.response?.data?.message || 'Ocurrió un problema al crear el usuario.';
                const errorMessage = 'Ocurrió un problema al crear el alumno.';
                showErrorAlert('Error', errorMessage);
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
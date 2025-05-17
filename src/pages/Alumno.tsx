import React, { useState } from 'react';
import { TanstackTable } from '../components/Table'
import { ColumnDef } from '@tanstack/react-table';
import Alumno from '../model/Alumno';
import useGetAlumnos from '../hooks/alumno/useGetAlumno';
import useCreateAlumno from '../hooks/alumno/useCreateAlumno';
import PopupAlumno from '../components/PopupAlumno';



type Props = {
  alumnos: Alumno[];
};

const ListaAlumnos: React.FC<Props> = () => {
  const { alumnos, fetchAlumno, setAlumno } = useGetAlumnos();
  //Preparar los hooks para el boton de crear
  const { 
    handleClickCreate, 
    handleCreate,
    isCreatePopUpOpen,
    setIsCreatePopUpOpen
  } = 
    useCreateAlumno(setAlumno, fetchAlumno);

  console.log("alumnos");
  console.log(alumnos);
  //const [alumnos, useAlumnos] = useState([]);

  //const handlerCreateAlumno = () => {
    //console.log("create");
  //}
  
  return (
    <div>
      <h2>Lista de Alumnos</h2>
      <TanstackTable 
        data={alumnos} 
        handlerCreateAlumno={handleCreate}
        handleClickCreate={handleClickCreate}/>
      <PopupAlumno
        show={isCreatePopUpOpen}
        setShow={setIsCreatePopUpOpen}
        data={[]}
        action={handleCreate}/>
    </div>
  );
};

export default ListaAlumnos;
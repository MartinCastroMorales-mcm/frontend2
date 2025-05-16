import React, { useState } from 'react';
import { TanstackTable } from '../components/Table'
import { ColumnDef } from '@tanstack/react-table';
import Alumno from '../model/Alumno';
import useGetAlumnos from '../hooks/useGetAlumno';



type Props = {
  alumnos: Alumno[];
};

const ListaAlumnos: React.FC<Props> = () => {
  const { alumnos, fetchAlumno, setAlumno } = useGetAlumnos();
  console.log("alumnos");
  console.log(alumnos);
  //const [alumnos, useAlumnos] = useState([]);
  
  return (
    <div>
      <h2>Lista de Alumnos</h2>
      < TanstackTable data={alumnos}/>

    </div>
  );
};

export default ListaAlumnos;
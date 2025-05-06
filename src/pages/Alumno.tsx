import React, { useState } from 'react';
import { TanstackTable } from '../components/Table'
import { ColumnDef } from '@tanstack/react-table';


export type Alumno = {
  id_alumno: number
  rut_alumno: string
  nombre_alumno: string
  nombre_completo_alumno: string
  fecha_nacimiento_alumno: Date
  correo_alumno: string
};

type Props = {
  alumnos: Alumno[];
};

const ListaAlumnos: React.FC<Props> = () => {
  const [alumnos, useAlumnos] = useState([]);
  
  return (
    <div>
      <h2>Lista de Alumnos</h2>
      < TanstackTable data={alumnos}/>

    </div>
  );
};

export default ListaAlumnos;
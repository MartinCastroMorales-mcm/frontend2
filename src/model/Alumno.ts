type Alumno = {
  //la id estaria indefinida cuando este modelo se usa en el formulario 
  //de creacion
  id_alumno: number | undefined
  rut_alumno: string
  nombre_alumno: string
  nombre_completo_alumno: string
  fecha_nacimiento_alumno: Date
  correo_alumno: string
};

export default Alumno;
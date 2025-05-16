import Alumno from "./Alumno"

type ResponseEntity = {
    data: {
        alumnos: Alumno[],
    },
    message: string
}

export default ResponseEntity;

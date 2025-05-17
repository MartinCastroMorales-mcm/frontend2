import Form from './Form';
//import '../styles/popup.css';
import '../styles/popup.css'
//import CloseIcon from '@assets/XIcon.svg';
//import QuestionIcon from 'assets/QuestionCircleIcon.svg';
import Alumno from '../model/Alumno';
import { X } from 'lucide-react';


type props = {
    show: boolean,
    //La funcion retornada por un useState es de tipo
    //React.Dispatch<React.SetStateAction<T>>
    //donde t es el tipo del primer valor retorndado por useState
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    data: Alumno[],
    action: (nuevoAlumno: Alumno) => void
}

export default function Popup({ show, setShow, data, action } : props) {
    //const alumnoData = data && data.length > 0 ? data[0] : {};
    //Decidi dejarlo como data[0] debido a que al estar definido como arr,
    //era confuso de otro modo. hay que mantener consistencia de tipo para
    //que funcione
    console.log("alumnosData");
    console.log(data);
    const alumnoData : Alumno = {
       id_alumno: undefined,
       rut_alumno: "",
       nombre_alumno: "",
       nombre_completo_alumno: "", 
       fecha_nacimiento_alumno: new Date(),
       correo_alumno: "",
    }//data[0];


    //Tiene que ser de tipo any porque asi esta definido en el Form.tsx
    const handleSubmit = (formData : any) => {
        console.log("submit")
        console.log(formData)
        action(formData);
    };

    //const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);
    return (
        <div>
            { show && (
            <div className="bg ">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        {/*
                        <img src={CloseIcon} />
                        */}
                        <X/>
                    </button>
                    <Form
                            title="Formulario de creacion de usuario"
                            fields={[
                                {
                                    label: "Rut Alumno",
                                    name: "rut_alumno",
                                    defaultValue: alumnoData.rut_alumno || "",
                                    placeholder: '20.941.502-K',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 11,
                                    maxLength: 12,
                                    pattern: /^\d{1,2}\.\d{3}\.\d{3}-[0-9Kk]$/, ///^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "Debe tener el formato de rut",
                                    //Las propiedades inferiores no estaban definidas en la plantilla 
                                    //del diego, ya que estas eran opcionales
                                    //typescript obliga a defnirlas todas para evitar 
                                    //ambiguedad. Lo mismo aplica para los otros field
                                    validate: () => true,
                                    disabled: false,
                                    onChange: () => { },
                                    options: [],
                                    errorMessageData: undefined,
                                    minDate: new Date(),
                                    maxDate: new Date()
                                },
                                {
                                    label: "Nombre Completo Alumno",
                                    name: "nombre_completo_alumno",
                                    defaultValue: alumnoData.nombre_completo_alumno || "",
                                    placeholder: 'Martín Castro Morales',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 50,
                                    pattern: undefined,
                                    patternMessage: '',
                                    validate: () => true,
                                    disabled: false,
                                    //valor por defecto
                                    onChange: () => { },
                                    options: [],
                                    errorMessageData: undefined,
                                    //Este valor por defecto no tiene sentido
                                    //pero para arreglarlo habria que editar el form
                                    //y la definicion del tipo field
                                    minDate: new Date(), 
                                    maxDate: new Date()
                                },
                                {
                                    label: "Fecha de nacimiento del alumno",
                                    name: 'fecha_nacimiento_alumno',
                                    defaultValue: '',
                                    placeholder: '21-12-2001',
                                    fieldType: 'date',
                                    required: true,
                                    type: 'date',
                                    minLength: 0,
                                    maxLength: 0,
                                    pattern: undefined,
                                    patternMessage: '',
                                    validate: () => true,
                                    disabled: false,
                                    onChange: () => {},
                                    options: [],
                                    errorMessageData: undefined,
                                    minDate: new Date(1950, 0, 1),
                                    maxDate: new Date(2050, 11, 31) 
                                },
                                {
                                    label: "Correo Electronico",
                                    name: "nombre_completo_alumno",
                                    defaultValue: alumnoData.nombre_completo_alumno || "",
                                    placeholder: 'ejemplo@gmail.com',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 50,
                                    pattern: undefined,
                                    patternMessage: '',
                                    validate: () => true,
                                    disabled: false,
                                    //valor por defecto
                                    onChange: () => { },
                                    options: [],
                                    errorMessageData: undefined,
                                    //Este valor por defecto no tiene sentido
                                    //pero para arreglarlo habria que editar el form
                                    //y la definicion del tipo field
                                    minDate: new Date(), 
                                    maxDate: new Date()
                                },
                                //{
                                    //label: (
                                        //<span>
                                            
                                            //<span className='tooltip-icon'>
                                                //{/*}
                                                //<img src={QuestionIcon} />
                                                //*/}
                                                //<span className='tooltip-text'>Este campo es opcional</span>
                                            //</span>
                                        //</span>
                                    //),
                                    //name: "newPassword",
                                    //placeholder: "**********",
                                    //fieldType: 'input',
                                    //type: "password",
                                    //required: false,
                                    //minLength: 8,
                                    //maxLength: 26,
                                    //pattern: /^[a-zA-Z0-9]+$/,
                                    //patternMessage: "Debe contener solo letras y números",
                                    //defaultValue: '',
                                    //validate: () => true,
                                    //disabled: false,
                                    //onChange: () => {},
                                    //options: [],
                                    //errorMessageData: undefined
                                //}
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Crear el usuario"
                            backgroundColor={'#fff'} footerContent={''} children={undefined}                    />
                </div>
            </div>
            )}
        </div>
    );
}
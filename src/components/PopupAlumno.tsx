import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';
import Alumno from '../model/Alumno';


type props = {
    show: boolean,
    //La funcion retornada por un useState es de tipo
    //React.Dispatch<React.SetStateAction<T>>
    //donde t es el tipo del primer valor retorndado por useState
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    data: Alumno[],
    action: (nuevoAlumno: Alumno[]) => void
}

export default function Popup({ show, setShow, data, action } : props) {
    //const alumnoData = data && data.length > 0 ? data[0] : {};
    //Decidi dejarlo como data[0] debido a que al estar definido como arr,
    //era confuso de otro modo. hay que mantener consistencia de tipo para
    //que funcione
    const alumnoData = data[0];


    //Tiene que ser de tipo any porque asi esta definido en el Form.tsx
    const handleSubmit = (formData : any) => {
        action(formData);
    };

    const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);
    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                            title="Editar usuario"
                            fields={[
                                {
                                    label: "Nombre completo",
                                    name: "nombreCompleto",
                                    defaultValue: alumnoData.rut_alumno || "",
                                    placeholder: 'Diego Alexis Salazar Jara',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 50,
                                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "Debe contener solo letras y espacios",
                                    //Las propiedades inferiores no estaban definidas en la plantilla 
                                    //del diego, ya que estas eran opcionales
                                    //typescript obliga a defnirlas todas para evitar 
                                    //ambiguedad. Lo mismo aplica para los otros field
                                    validate: function (value: any): boolean | string {
                                        throw new Error('Function not implemented.');
                                    },
                                    disabled: false,
                                    onChange: function (event: any): void {
                                        throw new Error('Function not implemented.');
                                    },
                                    options: [],
                                    errorMessageData: undefined
                                },
                                {
                                    label: "Correo electrónico",
                                    name: "email",
                                    defaultValue: alumnoData.correo_alumno || "",
                                    placeholder: 'example@gmail.com',
                                    fieldType: 'input',
                                    type: "email",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 30,
                                    pattern: undefined,
                                    patternMessage: '',
                                    validate: function (value: any): boolean | string {
                                        throw new Error('Function not implemented.');
                                    },
                                    disabled: false,
                                    onChange: function (event: any): void {
                                        throw new Error('Function not implemented.');
                                    },
                                    options: [],
                                    errorMessageData: undefined
                                },
                                {
                                    label: "Rut",
                                    name: "rut",
                                    defaultValue: alumnoData.rut_alumno || "",
                                    placeholder: '21.308.770-3',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 9,
                                    maxLength: 12,
                                    pattern: patternRut,
                                    patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                                    required: true,
                                    validate: function (value: any): boolean | string {
                                        throw new Error('Function not implemented.');
                                    },
                                    disabled: false,
                                    onChange: function (event: any): void {
                                        throw new Error('Function not implemented.');
                                    },
                                    options: [],
                                    errorMessageData: undefined
                                },
                                {
                                    label: (
                                        <span>
                                            Nueva contraseña
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>Este campo es opcional</span>
                                            </span>
                                        </span>
                                    ),
                                    name: "newPassword",
                                    placeholder: "**********",
                                    fieldType: 'input',
                                    type: "password",
                                    required: false,
                                    minLength: 8,
                                    maxLength: 26,
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    patternMessage: "Debe contener solo letras y números",
                                    defaultValue: '',
                                    validate: function (value: any): boolean | string {
                                        throw new Error('Function not implemented.');
                                    },
                                    disabled: false,
                                    onChange: function (event: any): void {
                                        throw new Error('Function not implemented.');
                                    },
                                    options: [],
                                    errorMessageData: undefined
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Editar usuario"
                            backgroundColor={'#fff'} footerContent={''} children={undefined}                    />
                </div>
            </div>
            )}
        </div>
    );
}
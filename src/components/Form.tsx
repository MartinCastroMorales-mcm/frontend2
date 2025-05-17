import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { Eye, EyeOff } from 'lucide-react'
//import '../styles/form.css';
//import '../styles/form.css'
//import HideIcon from '../assets/HideIcon.svg';
//import ViewIcon from '../assets/ViewIcon.svg';

type formParams = {
    title: string,
    fields: field[],
    buttonText: string,
    //TODO: quitar este any
    onSubmit: (data: any) => void,
    footerContent: string,
    backgroundColor: string,
    children: React.ReactNode
}
//Este tipo es bastante complicado pero es lo que estaba en la 
//plantilla del Diego
type field = {
    //label puede ser un conjuntos de elementos jsx segun lo que muestra la plantilla del Diego
    label: string | React.ReactNode,
    name: string,
    defaultValue: string,
    placeholder: string,
    fieldType: string,
    required: boolean,
    type: string,
    minLength: number,
    maxLength: number,
    minDate: Date,
    maxDate: Date,
    pattern: RegExp | undefined,
    patternMessage: string,
    //esto es para funciones de validacion personalizadas.
    //hay muchas formas de definirlo pero la mas simple es esta
    //normalmente retorna o verdadero o una string con el mensaje de error
    validate: (value: any) => boolean | string
    disabled: boolean,
    onChange: (event: any) => void
    options: option[]
    errorMessageData: any;
}
type option = {
    value: string,
    label: string
}

const Form = (
    { title, fields,
        buttonText, onSubmit,
        footerContent, backgroundColor,
        children }: formParams) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const onFormSubmit = (data: any) => {
        console.log("onSubmit");
        onSubmit(data);
    };

    const inputStyle = "w-full py-2 border-4 border-red-700 text-gray-700 " +
        "rounded-lg hover:bg-gray-200 focus:outline-none " +
        "focus:ring-2 focus:ring-red-900"
    const buttonStyle = "w-full py-2 bg-red-700 text-white rounded-lg hover:bg-red-900"

    return (
        <div className=''>
            <div className=''>
                <form
                    className="form"
                    //style={{ backgroundColor: backgroundColor }}
                    onSubmit={handleSubmit(onFormSubmit)}
                    autoComplete="off"
                >
                    <h1 className='text-3xl flex primary-text-color justify-center items-center mb-10'>{title}</h1>
                    {fields.map((field, index) => (
                        <div className="container_inputs" key={index}>
                            {field.label && <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor={field.name}>{field.label}</label>}
                            <div className='flex'>
                                {field.fieldType === 'input' && (

                                    <input
                                        className={`${inputStyle} placeholder-gray-400`}
                                        {...register(field.name, {
                                            required: field.required ? 'Este campo es obligatorio' : false,
                                            minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : undefined,
                                            maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : undefined,
                                            pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : undefined,
                                            validate: field.validate || {},
                                        })}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        type={field.type === 'password' && field.name === 'password' ? (showPassword ? 'text' : 'password') :
                                            field.type === 'password' && field.name === 'newPassword' ? (showNewPassword ? 'text' : 'password') :
                                                field.type}
                                        defaultValue={field.defaultValue || ''}
                                        disabled={field.disabled}
                                        onChange={field.onChange}
                                    />
                                )}
                                {field.fieldType === 'date' && (
                                    <input className={`${inputStyle} placeholder-gray-400`}
                                    type='date'
                                    {...register(field.name, {
                                        required: field.required ? "Este campo es obligatorio" : false,
                                        min: {value: field.minDate.toISOString().split("T")[0], 
                                            message: `La fecha debe ser posterior a ${field.minDate.toISOString().split("T")[0]}`},
                                        max: {value: field.maxDate.toISOString().split("T")[0], 
                                            message: `La fecha debe ser anterior a ${field.maxDate.toISOString().split("T")[0]}`}
                                    })}
                                    />
                                )} 
                                {field.fieldType === 'textarea' && (
                                    <textarea
                                        {...register(field.name, {
                                            required: field.required ? 'Este campo es obligatorio' : false,
                                            minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : undefined,
                                            maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : undefined,
                                            pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : undefined,
                                            validate: field.validate || {},
                                        })}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        defaultValue={field.defaultValue || ''}
                                        disabled={field.disabled}
                                        onChange={field.onChange}
                                    />
                                )}
                                {field.fieldType === 'select' && (
                                    <select
                                        {...register(field.name, {
                                            required: field.required ? 'Este campo es obligatorio' : false,
                                            validate: field.validate || {},
                                        })}
                                        name={field.name}
                                        defaultValue={field.defaultValue || ''}
                                        disabled={field.disabled}
                                        onChange={field.onChange}
                                    >
                                        <option value="">Seleccionar opción</option>
                                        {field.options && field.options.map((option, optIndex) => (
                                            <option className="options-class" key={optIndex} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {field.type === 'password' && field.name === 'password' && (
                                    <span className="top-1/2 toggle-password-icon" onClick={togglePasswordVisibility}>
                                        {showPassword ? <Eye /> : <EyeOff />}
                                        {/*
                                        <img src={showPassword ? ViewIcon : HideIcon} />
                                        */}
                                    </span>
                                )}
                                {field.type === 'password' && field.name === 'newPassword' && (
                                    <span className="top-1/2 toggle-password-icon" onClick={toggleNewPasswordVisibility}>
                                        {showNewPassword ? <Eye /> : <EyeOff />}
                                        {/*
                            <img src={showNewPassword ? ViewIcon : HideIcon} />
                            */}
                                    </span>
                                )}
                            </div>

                            <div className="text-red-700">
                                {errors[field.name]?.message || field.errorMessageData || ''}
                            </div>
                        </div>
                    ))}
                    {children}

                    {buttonText && <button className={buttonStyle} type="submit">{buttonText}</button>}
                    {footerContent && <div className="footerContent">{footerContent}</div>}
                </form>
            </div>
            <DevTool control={control} />
        </div>
    );
};

//{`error-message ${errors[field.name] || field.errorMessageData ? 'visible' : ''}`}
export default Form;
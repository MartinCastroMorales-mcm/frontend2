import { useState, useEffect } from 'react';


const useLogin2 = () => {
    
}

const useLogin = () => {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [inputData, setInputData] = useState({ email: '', password: '' });

    useEffect(() => {
        if (inputData.email) setErrorEmail('');
        if (inputData.password) setErrorPassword('');
    }, [inputData.email, inputData.password]);

    const errorData = (dataMessage : any) => {
        if (dataMessage.dataInfo === 'email') {
            setErrorEmail(dataMessage.message);
        } else if (dataMessage.dataInfo === 'password') {
            setErrorPassword(dataMessage.message);
        }
    };

    const handleInputChange = (field : any, value : any) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return {
        errorEmail,
        errorPassword,
        inputData,
        errorData,
        handleInputChange,
    };
};

export default useLogin;
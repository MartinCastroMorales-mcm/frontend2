import { Outlet } from 'react-router-dom';
//import Navbar from '@components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Root: React.FC = () =>  {
return (
    <AuthProvider>
        <PageRoot/>
    </AuthProvider>
);
}

//Le da tipo React.FC (functional component)
const PageRoot: React.FC = () => {
return (
    <>
        <Navbar />
        <Outlet />

    </>
);
}

export default Root;
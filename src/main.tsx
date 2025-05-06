import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root.tsx'
import Error404 from './pages/Error404.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Registrar from './pages/Registrar.tsx'
import Alumno from './pages/Alumno.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/alumnos',
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <Alumno/>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "/auth",
    element: <Login/>
  },
  {
    path: "/registrar",
    element: <Registrar/>
  }
])



  {/*
  <StrictMode>
    <App />
  </StrictMode>,
  */}
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)

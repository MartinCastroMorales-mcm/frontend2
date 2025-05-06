import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Eye } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const colorPrimario = "bg-red-700"
  const colorSecundario = "black"
  const colorTerciario = "gray-100"

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Alumnos', href: '/alumnos' },
    { name: 'Usuarios', href: '/usuarios' },
    { name: 'Notas', href: '/notas' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Editor', href: '/editor' },
    { name: 'Manual', href: '/manual' },
  ];
  return (
    <header className={`${colorPrimario} shadow-md`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
          {/* 
            <Car className="h-8 w-8 text-blue-600" />
          */}
            <Eye  
           className="h-12 w-auto"></Eye>
            <span className="text-xl font-bold">Troykeye</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-${colorTerciario} hover:text-${colorSecundario} hover:font-bold transition-colors`}
              >
                {item.name}
              </Link>
            ))}

            {/* 
            <Link
              to="/matricula"
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-6 mr-2" />
              Matriculate Aqui
            </Link>
            */}
         </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`h-6 w-6 text-${colorTerciario}`} />
            ) : (
              <Menu className={`h-6 w-6 text-${colorTerciario}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-${colorTerciario} hover:text-${colorSecundario} transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
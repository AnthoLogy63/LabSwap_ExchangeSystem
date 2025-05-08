import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className="w-64 bg-blue-500 h-screen p-4 left-0 top-0">s
        <h1>MENU</h1>

        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-blue-400">InicioDeSesion</Link>
          </li>
          <li>
            <Link to="/inicio" className="hover:text-blue-400">PaginaDeInicio</Link>
          </li>
        </ul>

      </div>
    );
  }
  
export default Navbar;
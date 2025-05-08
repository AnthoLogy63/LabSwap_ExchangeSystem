import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className="">
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
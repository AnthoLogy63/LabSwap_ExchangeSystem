import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role) => {
    login(role);
    navigate("/inicio");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Inicia sesión</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleLogin("user")}
      >
        Entrar como Usuario
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => handleLogin("admin")}
      >
        Entrar como Administrador
      </button>
    </div>
  );
}

export default Login;
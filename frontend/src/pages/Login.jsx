import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import abet from "../assets/PaginaDeInicio/abet.png";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "student") navigate("/inicio");
    else if (user?.role === "admin") navigate("/admin/panel-cursos");
  }, [user, navigate]);

  const handleGoogleLogin = async (credential) => {
    setLoading(true);
    await login(credential);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-teal-800 flex flex-col justify-center py-10">
      <div className="w-[95%] max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-10 items-center">
        <div className="flex-1 text-white text-center lg:text-left px-4">
          <h1 className="text-4xl font-bold mb-2">Lab Swap</h1>
          <p className="text-lg">Una página para intercambiar los cursos que necesitas</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Inicia sesión</h2>
          {loading ? (
            <div className="my-8 text-teal-700">Cargando...</div>
          ) : (
            <GoogleLogin
              onSuccess={credentialResponse => {
                handleGoogleLogin(credentialResponse.credential);
              }}
              onError={() => {
                alert('Falló el inicio de sesión');
              }}
            />
          )}
          <p className="text-sm text-gray-600 mt-4">Solo se permite acceso institucional</p>
        </div>
      </div>

      <div className="mt-10 w-[95%] max-w-5xl mx-auto h-44 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center shadow">
        <img src={abet} alt="ABET Logo" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;

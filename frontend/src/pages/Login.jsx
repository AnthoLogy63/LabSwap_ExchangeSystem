import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (role) => {
    login(role)
    navigate("/inicio")
  }

  return (
    <div className="min-h-screen bg-teal-800 flex flex-col justify-center py-10">
      {/* Contenedor con ancho limitado y espacio reducido entre columnas */}
      <div className="w-[95%] max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-10 items-center">
        
        {/* Texto a la izquierda */}
        <div className="flex-1 text-white text-center lg:text-left px-4">
          <h1 className="text-4xl font-bold mb-2">Lab Swap</h1>
          <p className="text-lg">Una página para intercambiar los cursos que necesitas</p>
        </div>

        {/* Login a la derecha */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Inicia sesión</h2>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
            onClick={() => handleLogin("user")}
          >
            Entrar como Usuario
          </button>
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={() => handleLogin("admin")}
          >
            Entrar como Administrador
          </button>
          <p className="text-sm text-gray-600 mt-4">Selecciona tu tipo de acceso</p>
        </div>
      </div>

      {/* Imagen inferior */}
      <div className="mt-10 w-[95%] max-w-5xl mx-auto h-44 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center shadow">
        Aquí irá la imagen institucional
      </div>
    </div>
  )
}

export default Login

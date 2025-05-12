import Navbar from '../layouts/Navbar'
import { FaUserCircle } from 'react-icons/fa'

function PaginaDeInicio() {
  return (
    <div className="flex">
      <Navbar />

      {/* Padding-left para que no tape el contenido */}
      <main className="flex-1 pl-64 p-10">
        {/* Usuario arriba a la derecha */}
        <div className="flex justify-end mb-10">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-red-900" />
            <span className="text-lg text-red-900 font-semibold">Pepe Carrillo</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-teal-900 mb-2">Bienvenido a Lab-Swap</h1>
        <p className="text-lg mb-10">Una página para intercambiar los cursos que necesitas</p>

        <h2 className="text-2xl font-bold mb-6">Solo con 3 pasos:</h2>

        <div className="grid grid-cols-3 gap-6">
          {["Publica", "Busca", "Cambia"].map((paso) => (
            <div key={paso} className="text-center">
              <img src="/src/assets/demo.png" alt={paso} className="w-full rounded shadow-lg mb-4" />
              <h3 className="text-lg font-semibold text-teal-800">{paso}</h3>
              <p className="text-sm text-gray-600">
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default PaginaDeInicio

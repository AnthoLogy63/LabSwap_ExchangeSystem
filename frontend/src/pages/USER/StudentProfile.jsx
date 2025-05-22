import { Pencil, UserCircle2 } from 'lucide-react'

function StudentProfile() {
  const user = {
    nombre: 'Pepe Carrillo Quispe Juan',
    anio: '5to',
    numero: '923423419',
    correoUnsa: 'pcarrilla@unsa.edu.pe',
    correoAdicional: 'pcarrilla@gmail.com',
  }

  return (
    // El contenedor usa padding general y color de fondo, ya no justify-center
    <div className="min-h-screen bg-gray-100 flex items-start pt-10">
      
      {/* Solo ml-64 para respetar el navbar, sin centrar horizontal */}
      <div className="ml-50 w-full flex justify-center">
        <div className="bg-white p-12 max-w-4xl w-[100%] mx-auto rounded-xl shadow-2xl">
          {/* Ícono */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-800 p-5 rounded-full">
              <UserCircle2 className="text-white w-12 h-12" />
            </div>
          </div>

          {/* Nombre */}
          <h2 className="text-center text-2xl font-bold text-red-800 mb-6">
            {user.nombre}
          </h2>

          {/* Información */}
          <div className="grid grid-cols-3 gap-4 text-base mb-8">
            <div className="font-semibold text-right">Año:</div>
            <div className="col-span-1 border-l pl-4">{user.anio}</div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />

            <div className="font-semibold text-right">Número:</div>
            <div className="col-span-1 border-l pl-4">{user.numero}</div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />

            <div className="font-semibold text-right">Correo UNSA:</div>
            <div className="col-span-2 border-l pl-4">{user.correoUnsa}</div>

            <div className="font-semibold text-right">Correo adicional:</div>
            <div className="col-span-1 border-l pl-4">{user.correoAdicional}</div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />
          </div>

          {/* Botón */}
          <div className="flex justify-end">
            <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile

import Image from "next/image"
import { Home, BookOpen, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-teal-700 text-white">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Lab Swap</h1>
        </div>
        <nav className="mt-6">
          <Link href="/" className="flex items-center gap-3 bg-teal-600/50 p-4 text-white">
            <Home className="h-5 w-5" />
            <span>Inicio</span>
          </Link>
          <Link href="/cursos" className="flex items-center gap-3 p-4 text-white hover:bg-teal-600/30">
            <BookOpen className="h-5 w-5" />
            <span>Lista de Cursos</span>
          </Link>
          <Link href="/mis-cursos" className="flex items-center gap-3 p-4 text-white hover:bg-teal-600/30">
            <Users className="h-5 w-5" />
            <span>Mis Cursos</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-900 flex items-center justify-center text-white">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-red-900 font-medium">Pepe Carrillo</span>
          </div>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold text-teal-800 mb-4">
            Bienvenido a<br />
            Lab-Swap
          </h1>

          <p className="text-xl text-teal-800 mb-12">Una página para intercambiar los cursos que necesitas</p>

          <h2 className="text-xl font-bold text-teal-800 mb-8">Solo con 3 pasos:</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <h3 className="text-center text-teal-800 font-medium mb-4">Publica</h3>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/placeholder.svg?height=250&width=250"
                  alt="Publica tus cursos"
                  width={250}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lore
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <h3 className="text-center text-teal-800 font-medium mb-4">Busca</h3>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/placeholder.svg?height=250&width=250"
                  alt="Busca cursos"
                  width={250}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lore
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <h3 className="text-center text-teal-800 font-medium mb-4">Cambia</h3>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/placeholder.svg?height=250&width=250"
                  alt="Intercambia cursos"
                  width={250}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lore
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

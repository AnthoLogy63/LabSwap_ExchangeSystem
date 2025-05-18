import { Link } from 'react-router-dom'

function UserBar() {
  return (
    <div className="flex justify-end items-center p-4">
      <Link to="/perfil" className="flex items-center space-x-2 hover:underline hover:text-red-700 transition">
        <div className="w-10 h-10 bg-red-800 text-white rounded-full flex items-center justify-center text-xl">👤</div>
        <span className="text-lg text-red-900 font-medium">Perfil</span>
      </Link>
    </div>
  )
}

export default UserBar

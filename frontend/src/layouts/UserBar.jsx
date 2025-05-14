function UserBar() {
  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-red-800 text-white rounded-full flex items-center justify-center text-xl">👤</div>
        <span className="text-lg text-red-900 font-medium">Pepe Carrillo</span>
      </div>
    </div>
  );
}

export default UserBar;
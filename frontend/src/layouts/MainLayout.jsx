import Navbar from "./Navbar";
import UserBar from "./UserBar";

const MainLayout = ({ user }) => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <UserBar />
        <div className="p-6">{user}</div>
      </div>
    </div>
  );
};

export default MainLayout;

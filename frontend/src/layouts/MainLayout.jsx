import Navbar from "./Navbar";
import UserBar from "./UserBar";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <UserBar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
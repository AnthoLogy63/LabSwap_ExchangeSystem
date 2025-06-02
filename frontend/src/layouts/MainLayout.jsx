import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import UserBar from './UserBar';
import { useAuth } from '../context/authContext';

const MainLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="flex min-h-screen">
      {user && !isLoginPage && <Navbar />}
      <div className="flex-1 flex flex-col">
        {user && !isLoginPage && <UserBar />}
        <main className="p-4 flex-grow bg-gray-100">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

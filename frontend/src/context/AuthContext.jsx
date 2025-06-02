import { createContext, useContext, useState, useEffect } from 'react'; 
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!user?.email || !user.email.endsWith("@unsa.edu.pe")) {
      logout();
    }
  }, []);

  const login = async (googleToken) => {
    try {
      const decoded = jwtDecode(googleToken);
      const email = decoded.email;
      const name = decoded.name;

      if (!email.endsWith('@unsa.edu.pe')) {
        alert('Solo se permite acceso con correo institucional');
        return;
      }
      /*
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email,
          name
        })
      });

      if (!response.ok) throw new Error("Fallo en la autenticación con el backend");

      const data = await response.json();

      const authData = {
        email: data.email,
        name: data.name,
        role: data.role,
        token: data.token
      };
      */
      // Simulación de respuesta del backend
      const role = email === 'fgarambel@unsa.edu.pe' ? 'admin' : 'user';
      const authData = { email, name, role };

      setUser(authData);
      localStorage.setItem('auth', JSON.stringify(authData));
    } catch (error) {
      alert('Hubo un problema al autenticar con el servidor.');
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

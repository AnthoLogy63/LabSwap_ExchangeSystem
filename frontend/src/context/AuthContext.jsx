import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      console.log("Usuario cargado:", user);
    }
  }, [user]);

  // Ahora login recibe googleToken (credential)
  const login = async (googleToken) => {
    try {
      // Enviar el token de Google al backend para validarlo y obtener el usuario y token del sistema
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: googleToken }),
      });

      if (!response.ok) throw new Error("Fallo en la autenticación con el backend");

      const data = await response.json();

      // data = { token, email, name, role }
      setUser(data);
      localStorage.setItem('auth', JSON.stringify(data));
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

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

  const login = async (googleToken, selectedRole) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: googleToken,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        // 🛠️ PARCHE: analiza el mensaje del backend
        if (errorText.includes("permiso")) {
          throw new Error("Este correo no tiene permiso de administrador");
        }

        // Otros errores genéricos
        throw new Error("Fallo en la autenticación con el servidor");
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem('auth', JSON.stringify(data));
    } catch (error) {
      throw error;
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

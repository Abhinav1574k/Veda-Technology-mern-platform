import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("veda_admin_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    const loadUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.data);
      } catch (error) {
        console.error("Session restore failed:", error);

        localStorage.removeItem("veda_admin_token");

        delete api.defaults.headers.common.Authorization;
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.data.token;
    const loggedInUser = response.data.data.user;

    localStorage.setItem(
      "veda_admin_token",
      token
    );

    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("veda_admin_token");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
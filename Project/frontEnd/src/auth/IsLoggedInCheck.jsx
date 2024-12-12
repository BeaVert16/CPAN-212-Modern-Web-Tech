import { createContext, useState, useEffect } from "react";
import LoadingCat from "../Global/LoadingCat/LoadingCat";
import { ipadd } from "../url";

export const IsLoggedInContext = createContext();

const IsLoggedInCheck = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${ipadd}/auth/session-check`, {
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setIsAuthenticated(result.isAuthenticated);
        setUser(result.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <IsLoggedInContext.Provider value={{ isAuthenticated, user, checkAuth }}>
      {loading ? <LoadingCat /> : children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInCheck;

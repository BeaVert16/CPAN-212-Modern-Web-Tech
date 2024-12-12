import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { IsLoggedInContext } from "./IsLoggedInCheck";

const RouteProtector = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useContext(IsLoggedInContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "admin" && !user?.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredRole === "premium" && !user?.isPremium) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RouteProtector;

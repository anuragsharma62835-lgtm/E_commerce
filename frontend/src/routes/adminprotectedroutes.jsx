import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (!decoded.isAdmin) {
      return <Navigate to="/home" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;

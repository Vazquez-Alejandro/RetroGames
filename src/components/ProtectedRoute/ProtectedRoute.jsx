import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children, rolesPermitidos }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
    return <Navigate to="/login" />;
  }

  return children;
}

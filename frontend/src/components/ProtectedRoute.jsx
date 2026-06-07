import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function normalizeRole(value) {
  return value ? String(value).toUpperCase() : '';
}

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = normalizeRole(user.role);
  const allowedRoles = Array.isArray(allowedRole)
    ? allowedRole.map(normalizeRole)
    : [normalizeRole(allowedRole)];

  if (allowedRoles.includes(role)) {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
}

export default ProtectedRoute;

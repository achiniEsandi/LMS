import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { state } = useAuthContext();

  if (!state?.isAuthenticated) return <Navigate to="/" />;

  // Null-safe mapping of user roles
  const userRoles = state?.groups?.map(g => (typeof g === "string" ? g : g?.value)) || [];

  const hasRole = userRoles.some(role => 
    role && allowedRoles.some(allowedRole => role.toLowerCase() === allowedRole.toLowerCase())
  );

  if (!hasRole) return <Navigate to="/" />;

  return children;
}

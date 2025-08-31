import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ReactNode } from "react";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

export const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const user = useAuthStore((state) => state.currentUser);

  if (!user) return <Navigate to="/login" replace />; // user not logged in
  if (!allowedRoles.includes(user.role)) 
    return <Navigate to={`/${user.role}/dashboard`} replace />; // user role not allowed

  return <>{children}</>;
};

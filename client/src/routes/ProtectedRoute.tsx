import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.currentUser);

  console.log("sfgsdgsdgsdg");
  

  if (!user) return <Navigate to="/login" replace />; 
  return <>{children}</>;
};



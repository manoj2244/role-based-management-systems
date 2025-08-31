import { ReactElement } from "react";
import Dashboard from "../pages/shared/Dashboard";
import Profile from "../pages/shared/Profile";
import UserManagement from "../pages/shared/UserManagement";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/super-admin/Settings";
import Orders from "../pages/user/Orders";

type Route = {
  path: string;
  element: ReactElement; 
};

type RoutesByRole = {
  [role: string]: Route[];
};

export const routesByRole: RoutesByRole = {
  user: [
    { path: "/user/dashboard", element: <Dashboard /> },
    { path: "/user/profile", element: <Profile /> },
    { path: "/user/orders", element: <Orders /> },
  ],
  admin: [
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/profile", element: <Profile /> },
    { path: "/admin/users", element: <UserManagement /> },
    { path: "/admin/analytics", element: <Analytics /> },
  ],
  super_admin: [
    { path: "/super-admin/dashboard", element: <Dashboard /> },
    { path: "/super-admin/profile", element: <Profile /> },
    { path: "/super-admin/users", element: <UserManagement /> },
    { path: "/super-admin/analytics", element: <Analytics /> },
    { path: "/super-admin/settings", element: <Settings /> },
  ],
};

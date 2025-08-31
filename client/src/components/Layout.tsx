import { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Users, Settings, BarChart3, LogOut } from "lucide-react";

interface Props { children: ReactNode; }

const Layout = ({ children }: Props) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: `/${currentUser?.role.replace("_", "-")}/dashboard`, icon: Home },
    { id: "profile", label: "Profile", path: `/${currentUser?.role.replace("_", "-")}/profile`, icon: User },
...(currentUser?.role === "admin" || currentUser?.role === "super_admin"
  ? [
      {
        id: "users",
        label: "Users",
        path: `/${currentUser?.role.replace("_", "-")}/users`,
        icon: Users,
      },
    ]
  : []),
    ...(currentUser?.role === "super_admin" ? [{ id: "settings", label: "Settings", path: "/super-admin/settings", icon: Settings }] : []),
    ...(currentUser?.role !== "user" ? [{ id: "analytics", label: "Analytics", path: `/${currentUser?.role.replace("_", "-")}/analytics`, icon: BarChart3 }] : []),
  ];

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <p className="font-bold">{currentUser?.name}</p>
          <p className="text-sm">{currentUser?.email}</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.path} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="flex items-center gap-2 mt-8 text-red-500 hover:bg-red-400 hover:text-red-50 p-2 rounded w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
      <div className="flex-1 bg-gray-100">{children}</div>
    </div>
  );
};

export default Layout;

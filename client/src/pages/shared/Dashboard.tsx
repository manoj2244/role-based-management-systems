import { Users } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useUsers } from "../../hooks/useUsers";

const Dashboard = () => {
  const { currentUser } = useAuthStore();

  const { users, isLoading } = useUsers();

  const totalUserCount = users?.filter((item:any) => item.role === "user").length || 0;

  console.log(users, "dsgsdgsdgdsg");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {currentUser?.name}!</p>
      </div>


{currentUser?.role!=="user"&& <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{totalUserCount}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>{" "}
      </div>}
     
    </div>
  );
};

export default Dashboard;

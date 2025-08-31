import React, { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { rolePermissions } from "../../permission/rolePermissions";
import { useUsers } from "../../hooks/useUsers";
import UserModal from "../../components/Modal"

interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super_admin";
}

const UserManagement: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { users, isLoading, deleteUser ,createUser, updateUser} = useUsers();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const permissions = rolePermissions[currentUser?.role ?? "user"];

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Role-based visible users
  let visibleUsers: User[] = users ?? [];
  if (currentUser?.role === "admin") {
    visibleUsers = visibleUsers.filter((item) => item.role === "user");
  } else if (currentUser?.role === "super_admin") {
    visibleUsers = visibleUsers.filter(
      (item) => item.role === "user" || item.role === "admin"
    );
  } else {
    visibleUsers = visibleUsers.filter((item) => item._id === currentUser?.id);
  }

  // Filter by search and role
  const filteredUsers = visibleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Open Add User Modal
  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  // Open Edit User Modal
  const handleEditUser = (user: User) => {

    
    setEditingUser(user);
    setShowModal(true);
  };

   const handleSaveUser = (user: User) => {
    if (editingUser?._id) {
      updateUser.mutate(
        { id: editingUser?._id, user },
        { onSuccess: () => {
            alert("Updated Sucessfully")
            setShowModal(false)
        } }
      );
    } else {
      createUser.mutate({...user,password:"password123"}, { onSuccess: () => {
        alert("Created Sucessfully")
        setShowModal(false)
      } });
    }
  };

  // Delete user
  const handleDeleteUser = (_id: string) => {
    if (!permissions.canDeleteUsers) return;
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      deleteUser.mutate(_id, {
        onSuccess: () => alert("User deleted successfully!"),
        onError: () => alert("Failed to delete user. Please try again."),
      });
    }
  };

  if (isLoading) return <div className="p-6 text-gray-600">Loading users...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        {permissions.canCreateUsers && (
          <button
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
            <option value="super_admin">Super Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === "super_admin"
                        ? "bg-red-100 text-red-800"
                        : user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                  {permissions.canEditUsers && (
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {permissions.canDeleteUsers && (
                    <button
                      onClick={() => handleDeleteUser(user._id??"0")}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 text-sm">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <UserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
          editingUser={editingUser}
        />
      )}
    </div>
  );
};

export default UserManagement;

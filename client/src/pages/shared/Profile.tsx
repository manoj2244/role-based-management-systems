import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUsers } from "../../hooks/useUsers";

const Profile = () => {
  const { currentUser,setUser } = useAuthStore();
  const { updateUser,isLoading } = useUsers();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();

    if (!currentUser) return;

    updateUser.mutate(
      { id: currentUser.id, user: { name, email } },
      {
        onSuccess: (data) => {

            console.log(data,"dsgdsgdsgds");

            setUser({...data?.data,id:data?.data?._id})
            

            

          alert("Profile updated successfully!");
        },
        onError: (err: any) => {
          alert(err.response?.data?.message || "Failed to update profile");
        },
      }
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

import React, { useEffect } from "react";
import { X, Save } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useFormik } from "formik";

interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super_admin";
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  editingUser?: User | null;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingUser,
}) => {
  const { currentUser } = useAuthStore();

  const availableRoles =
    currentUser?.role === "super_admin"
      ? ["user", "admin"]
      : currentUser?.role === "admin"
      ? ["user", "admin"]
      : ["user"];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "user" as User["role"],
    },
    validate: (values) => {
      const errors: Partial<Record<keyof User, string>> = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
      if (!values.role) errors.role = "Role is required";
      return errors;
    },
    onSubmit: (values) => {
      onSave(values);
      formik.resetForm();
      onClose();
    },
  });
  useEffect(() => {
    if (editingUser) {
      formik.setValues({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line
  }, [editingUser]);

  const resetForm = () => {
    formik.resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingUser ? "Edit User" : "Add New User"}
          </h3>
          <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...formik.getFieldProps("name")}
              placeholder="Enter user name"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...formik.getFieldProps("email")}
              placeholder="Enter email address"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...formik.getFieldProps("role")}
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role.replace("_", " ")}
                </option>
              ))}
            </select>
            {formik.errors.role && formik.touched.role && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={resetForm}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
          type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || formik.isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {editingUser ? "Update" : "Create"} User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;

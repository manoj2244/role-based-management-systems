import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { api } from "../services/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Shield } from "lucide-react";

const Login = () => {
  const setUser = useAuthStore((state) => state.setUser);

    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setRefreshToken = useAuthStore((state)=>state.setRefreshToken)

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    setServerError("");
    try {
        
      const { data } = await api.post("/auth/login", values);
      setUser(data.user);
setAccessToken(data.accessToken)

setRefreshToken(data.refreshToken)
      if (data.user.role === "user") navigate("/user/dashboard");
      if (data.user.role === "admin") navigate("/admin/dashboard");
      if (data.user.role === "super_admin") navigate("/super-admin/dashboard");
    } catch (err) {
      setServerError("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="p-8">
      
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Login Portal</h1>
          </div>
          
          <Formik   initialValues={{ email: "", password: "" }}
          validate={validate} onSubmit={handleSubmit}>
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email && touched.email ? 'border-red-400' : 'border-white/20'
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.password && touched.password ? 'border-red-400' : 'border-white/20'
                    }`}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                </div>
                {serverError && <p className="text-red-400 text-sm">{serverError}</p>}


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </Form>
            )}
          </Formik>

            <div className="mt-6 p-4 bg-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <div>user@example.com / password123</div>
            <div>admin@example.com / password123</div>
            <div>superadmin@example.com / password123</div>
          </div>
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default Login;

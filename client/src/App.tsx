import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./routes/ProtectedRoute";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routesByRole } from "./routes/routeConfig";
import { useAuthStore } from "./store/authStore";

const queryClient = new QueryClient();

function App() {
  const { currentUser ,accessToken,refreshToken } = useAuthStore();

  const role = currentUser?.role;

  console.log(currentUser,accessToken,refreshToken , "sdgsdgsgdsgs");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />


          {role ? (
            routesByRole[role].map((route: any, index: number) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Layout>{route.element}</Layout>
                  </ProtectedRoute>
                }
              />
            ))
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

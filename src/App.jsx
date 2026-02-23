import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GoalsPage from "./pages/GoalsPage";
import Navbar from "./components/Navbar";
import GoalCard from "./components/GoalCard";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  return localStorage.getItem("token") ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
}

export default function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {isLoggedIn && !hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <PrivateRoute>
              <GoalsPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

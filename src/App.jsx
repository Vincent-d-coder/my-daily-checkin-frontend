import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from  "./pages/Dashboard";


export default function App(){
  const isAuth = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route
        path="/"
        element={isAuth ? <Dashboard /> : <Navigate to="/Login" />}
        />
    </Routes>
  )
}
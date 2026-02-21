import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid gray" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/goals">Goals</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
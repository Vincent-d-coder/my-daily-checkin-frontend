import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-inner">
        <div style={{ fontWeight: 800, color: "#1f2d3d" }}>Daily Check-In</div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/goals">Goals</Link>
          <button className="btn btn-ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

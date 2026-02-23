import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/auth/signup", { email, password });
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Start tracking your daily progress</p>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/login")}
            >
              Already have account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

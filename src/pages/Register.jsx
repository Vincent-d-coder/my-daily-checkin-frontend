import { useState } from "react";
import API from "../services/api";

export default function  Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        await API.post("/auth/signup", { email, password });
        window.location.href = "/login";
    };
 return (
    <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
        <button>Register</button>
    </form>
);
}

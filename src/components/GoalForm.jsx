import { useState } from "react";
import API from "../services/api";

export default function GoalForm({ reload }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/goals", { title, location });

    setTitle("");
    setLocation("");
    reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-control">
        <input
          className="input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <button className="btn btn-primary">Create Goal</button>
      </div>
    </form>
  );
}

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
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button>Create Goal</button>
    </form>
  );
}

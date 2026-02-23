import { useState } from "react";

export default function GoalCard({ goal, deleteGoal, updateGoal }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(goal.title);
  const [location, setLocation] = useState(goal.location);

  const handleUpdate = () => {
    updateGoal(goal._id, { title, location });
    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <div>
          <div className="form-control">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save
            </button>
            <button className="btn btn-ghost" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ marginTop: 0 }}>{goal.title}</h3>
          <p style={{ color: "#6b7280" }}>{goal.task}</p>
          <p style={{ marginTop: 8, fontSize: 13, color: "#9ca3af" }}>
            {goal.location}
          </p>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => deleteGoal(goal._id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";

export default function GoalCard({ goal, deleteGoal, updateGoal }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(goal.title || "");
  const [location, setLocation] = useState(goal.location || "");

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <div className="goal-title">{goal.title}</div>
              <div style={{ color: "#6b7280", marginTop: 6 }}>{goal.task}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {goal.date &&
                  (() => {
                    const d = new Date(goal.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const gd = new Date(d);
                    gd.setHours(0, 0, 0, 0);
                    const status =
                      gd.getTime() === today.getTime()
                        ? "today"
                        : gd.getTime() > today.getTime()
                          ? "upcoming"
                          : "past";
                    return (
                      <span className={`badge badge--${status}`}>{status}</span>
                    );
                  })()}
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  {goal.location}
                </div>
              </div>
              <div className="goal-date">
                {goal.date ? new Date(goal.date).toLocaleDateString() : ""}
              </div>
            </div>
          </div>

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

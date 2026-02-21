
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
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{goal.title}</h3>
          <p>{goal.task}</p>
          <p>{goal.location}</p>
        </>
      )}

      <button onClick={() => setEditing(!editing)}>Edit</button>
      <button onClick={() => deleteGoal(goal._id)}>Delete</button>
    </div>
  );
}
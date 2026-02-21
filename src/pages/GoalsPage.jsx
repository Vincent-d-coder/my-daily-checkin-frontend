import { useEffect, useState } from "react";
import API from "../services/api";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const loadGoals = async () => {
    const res = await API.get("/goals");
    setGoals(res.data);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const deleteGoal = async (id) => {
    await API.delete(`/goals/${id}`);
    loadGoals();
  };

  const updateGoal = async (id, updatedData) => {
    await API.put(`/goals/${id}`, updatedData);
    loadGoals();
  };

  return (
    <div>
      <h1>Goals</h1>

      <GoalForm reload={loadGoals} />

      {goals.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          deleteGoal={deleteGoal}
          updateGoal={updateGoal}
        />
      ))}
    </div>
  );
}
import { useEffect, useState } from "react";
import API from "../services/api";
import CheckInCard from "../components/CheckInCard";

export default function Dashboard() {
  const [todayGoal, setTodayGoal] = useState(null);
  const [checkins, setCheckins] = useState([]);

  const loadData = async () => {
    const goalRes = await API.get("/goals/today");
    setTodayGoal(goalRes.data);

    const checkinRes = await API.get("/checkin");
    setCheckins(checkinRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async () => {
    if (checkins) return alert("you are already checked in");

    await API.post("/checkin", {
      status: "working",
      goalStatus: "in-progress",
      goalId: todayGoal._id,
    });

    loadData();
  };
  const calculateStreak = (checkins) => {
  if (!checkins.length) return 0;

  // normalize dates
  const dates = checkins
    .map(c => {
      const d = new Date(c.date);
      d.setHours(0,0,0,0);
      return d.getTime();
    })
    .sort((a, b) => b - a); // newest first

  let streak = 0;
  let today = new Date();
  today.setHours(0,0,0,0);

  let currentDay = today.getTime();

  for (let date of dates) {
    if (date === currentDay) {
      streak++;
      currentDay -= 86400000; // subtract 1 day
    } else if (date < currentDay) {
      break;
    }
  }

  return streak;
};

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>🔥 Current Streak: {calculateStreak(checkins)} days</h2>
      {todayGoal && (
        <>
          <h2>Today's Goal</h2>
          <p>{todayGoal.title}</p>
          <p>{todayGoal.task}</p>
        </>
      )}

      <button onClick={handleCheckIn}>Check In</button>

      <h2>Check-In History</h2>
      {checkins.map((c) => (
        <CheckInCard key={c._id} checkin={c} />
      ))}
    </div>
  );
}
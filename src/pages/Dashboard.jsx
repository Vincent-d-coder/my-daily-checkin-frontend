import { useEffect, useState } from "react";
import API from "../services/api";
import CheckInCard from "../components/CheckInCard";

export default function Dashboard() {
  const [todayGoal, setTodayGoal] = useState(null);
  const [checkins, setCheckins] = useState([]);
  console.log("set checkins");
  console.log(checkins);

  const loadData = async () => {
    const goalRes = await API.get("/goals/today");
    setTodayGoal(goalRes.data);

    const checkins = await API.get("/checkin");
    setCheckins(checkins.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async () => {
    try {
      // ensure there's a goal for today; create one if missing
      let goalId = todayGoal?._id;

      if (!goalId) {
        // send an empty object so backend receives a defined req.body
        const res = await API.post("/goals/today", {});
        setTodayGoal(res.data);
        goalId = res.data._id;
      }

      await API.post("/checkin", {
        status: "working",
        goalStatus: "in-progress",
        goalId,
      });

      loadData();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err?.message || "Check-in failed");
    }
  };
  const calculateStreak = (checkins) => {
    if (!checkins.length) return 0;

    // normalize dates
    const dates = checkins
      .map((c) => {
        const d = new Date(c.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
      .sort((a, b) => b - a); // newest first

    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

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

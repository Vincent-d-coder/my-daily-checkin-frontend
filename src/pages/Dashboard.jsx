import { useEffect, useState } from "react";
import API from "../services/api";
import CheckInCard from "../components/CheckInCard";

export default function Dashboard() {
  const [checkins, setCheckins] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // fetch all checkins
  const fetchCheckIns = async () => {
    try {
      const res = await API.get("/checkin");
      setCheckins(res.data.checkins);

      // calculate streak locally (for page refresh)
      let streak = 0;
      let longest = 0;

      res.data.forEach((c) => {
        if (c.completed) {
          streak++;
          if (streak > longest) longest = streak;
        } else {
          streak = 0;
        }
      });

      setCurrentStreak(streak);
      setLongestStreak(longest);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch checkins", err);
    }
  };

  // check in button
  const handleCheckIn = async () => {
    try {
      const res = await API.post("/checkin", { completed: true });

      // update streak from backend response
      setCurrentStreak(res.data.currentStreak);
      setLongestStreak(res.data.longestStreak);

      fetchCheckIns();
      alert("Checked in successfully 🎉");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>🔥 Daily Check-In Dashboard</h1>

      <button onClick={logout}>Logout 🚪</button>

      <hr />

      <h2>Current Streak: {currentStreak} days 🔥</h2>
      <h3>Longest Streak: {longestStreak} days 🏆</h3>

      <button onClick={handleCheckIn}>Check In Today ✅</button>

      <hr />

      <h2>History</h2>

      {!checkins?.length && <p>No checkins yet</p>}

      {checkins?.map((c) => (
        <CheckInCard key={c._id} checkin={c} />
      ))}
    </div>
  );
}

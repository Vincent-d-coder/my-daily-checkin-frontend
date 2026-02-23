import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CheckInCard from "../components/CheckInCard";

export default function Dashboard() {
  const [todayGoal, setTodayGoal] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [upcomingGoals, setUpcomingGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  console.log("set checkins");
  console.log(checkins);

  const loadData = async () => {
    const goalRes = await API.get("/goals/today");
    setTodayGoal(goalRes.data);

    const checkins = await API.get("/checkin");
    setCheckins(checkins.data);
    // fetch upcoming goals for sidebar summary
    try {
      const goalsRes = await API.get("/goals/upcoming");
      setUpcomingGoals(goalsRes.data || []);
    } catch (err) {
      setUpcomingGoals([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async () => {
    try {
      // require a selected goal (or explicit 'new' to create one)
      if (!selectedGoalId)
        return alert("Please select a goal (or choose 'Create new')");

      const wasCreatingNew = selectedGoalId === "new";
      let goalId = selectedGoalId;

      if (wasCreatingNew) {
        // create today's goal (backend fills defaults)
        const res = await API.post("/goals/today", {});
        setTodayGoal(res.data);
        goalId = res.data._id;
      }

      await API.post("/checkin", {
        status: "working",
        goalStatus: "in-progress",
        goalId,
      });

      // refresh
      setSelectedGoalId("");
      await loadData();

      if (wasCreatingNew) {
        navigate("/goals");
      }
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
    <div className="container">
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div>
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="stat">
                  <div className="value">{calculateStreak(checkins)}</div>
                  <div className="label">Current Streak</div>
                </div>
                {todayGoal ? (
                  <div style={{ marginTop: 12 }}>
                    <div className="goal-title">{todayGoal.title}</div>
                    <p className="goal-date">{todayGoal.task}</p>
                  </div>
                ) : (
                  <div style={{ marginTop: 12, color: "#6b7280" }}>
                    No goal set for today.
                  </div>
                )}
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Check In
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h2>Check-In History</h2>
            {checkins.length === 0 && (
              <p style={{ color: "#6b7280" }}>No check-ins yet.</p>
            )}
            {checkins.map((c) => (
              <CheckInCard key={c._id} checkin={c} />
            ))}
          </div>
          {/* left column intentionally left for main content */}
        </div>

        <aside>
          <div className="card" style={{ marginBottom: 12 }}>
            <h3 style={{ marginTop: 0 }}>Goals Summary</h3>
            {upcomingGoals.length === 0 && (
              <p style={{ color: "#6b7280" }}>No upcoming goals.</p>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {upcomingGoals.map((g) => (
                <li
                  key={g._id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #eef2f7",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{g.title}</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>
                    {new Date(g.date).toDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>Today's Summary</h3>
            <p style={{ color: "#6b7280" }}>
              Quick actions and stats will appear here.
            </p>
          </div>
        </aside>
      </div>
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            zIndex: 60,
            padding: 20,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="card"
            style={{
              width: "min(760px, 96%)",
              maxWidth: 760,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>Check In</h2>

            <div style={{ display: "grid", gap: 12 }}>
              <label style={{ fontSize: 13, color: "#374151" }}>
                Select goal
              </label>
              <select
                className="input"
                value={selectedGoalId}
                onChange={(e) => setSelectedGoalId(e.target.value)}
              >
                <option value="">-- Select a goal --</option>
                <option value="new">Create new goal for today</option>
                {upcomingGoals.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.title} — {new Date(g.date).toDateString()}
                  </option>
                ))}
              </select>

              <div
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
              >
                <button
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    await handleCheckIn();
                    setIsModalOpen(false);
                  }}
                  disabled={!selectedGoalId}
                >
                  Confirm Check In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckInCard({ checkin }) {
  if (!checkin) return null;
  const statusKey = checkin.status ? checkin.status.replace(/\s+/g, "-") : "";
  const goalStatusKey = checkin.goalStatus
    ? checkin.goalStatus.replace(/\s+/g, "-")
    : "";

  return (
    <div
      style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>🎯 {checkin.goal?.title}</h3>
        <div>
          {statusKey && (
            <span className={`badge badge--${statusKey}`}>
              {checkin.status}
            </span>
          )}
          {goalStatusKey && (
            <span className={`badge badge--${goalStatusKey}`}>
              {checkin.goalStatus}
            </span>
          )}
        </div>
      </div>

      <div
        style={{ marginTop: 10, display: "flex", gap: 18, flexWrap: "wrap" }}
      >
        <div style={{ color: "#6b7280" }}>
          📅 {new Date(checkin.date).toDateString()}
        </div>
        <div style={{ color: "#6b7280" }}>
          🧑‍💻 <strong>{checkin.status}</strong>
        </div>
        <div style={{ color: "#6b7280" }}>
          📈 <strong>{checkin.goalStatus}</strong>
        </div>
      </div>

      {checkin.goal && (
        <div style={{ marginTop: 10 }}>
          <strong>Goal:</strong> {checkin.goal.title}
        </div>
      )}
    </div>
  );
}

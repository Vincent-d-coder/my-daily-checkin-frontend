export default function CheckInCard({ checkin }) {
  if (!checkin) return null;

  return (
    <div style={{
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      
      <h3>🎯 {checkin.goal?.title}</h3>

      <p>
        📅 Date: {new Date(checkin.date).toDateString()}
      </p>

      <p>
        🧑‍💻 Work Status: <b>{checkin.status}</b>
      </p>

      <p>
        📈 Goal Progress: <b>{checkin.goalStatus}</b>
      </p>

      {checkin.goal && (
        <p>
          <strong>Goal:</strong> {checkin.goal.title}
        </p>
      )}  
    </div>
  );
}

export default function CheckInCard({ checkin }) {
  if (!checkin) return null;   // prevents crash if data missing

  return (
    <div>
      <p>Date: {new Date(checkin.date).toDateString()}</p>
      <p>Completed: {checkin.completed ? "✅" : "❌"}</p>
    </div>
  );
}

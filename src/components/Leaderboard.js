import { useState, useEffect } from "react";
import "../App.css"; // Ensure your styling is linked

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  // 1. Initial fetch of the leaderboard
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("http://localhost:5000/leaderboard");
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error("Error loading leaderboard:", err);
      }
    };

    fetchScores();

    // 2. Event Listener: Listens for 'scoreSubmitted' from Quiz.jsx
    const handleScoreUpdate = (event) => {
      // event.detail contains the new leaderboard array from the backend
      setScores(event.detail);
    };

    window.addEventListener("scoreSubmitted", handleScoreUpdate);

    // Cleanup to prevent memory leaks
    return () => window.removeEventListener("scoreSubmitted", handleScoreUpdate);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 style={{ textAlign: "center" }}>🏆 Hall of Fame</h2>
      <hr />
      
      {scores.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No scores yet. Be the first!</p>
      ) : (
        <table className="leaderboard-table" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Rank</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr 
                key={index} 
                className={index === 0 ? "top-rank" : ""}
                style={{ borderBottom: "1px solid #eee" }}
              >
                <td style={{ padding: "10px" }}>
                   {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </td>
                <td style={{ padding: "10px" }}>{entry.name}</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>{entry.score} / 15</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
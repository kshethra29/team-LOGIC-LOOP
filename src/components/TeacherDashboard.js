import React from "react";
import "../App.css";

export default function TeacherDashboard({ leaderboard }) {
  return (
    <div className="quiz-container" style={{ maxWidth: "800px" }}>
      <h1>👩‍🏫 Teacher Control Panel</h1>
      <h3>Class Performance Overview</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Latest Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={i}>
              <td>{entry.name}</td>
              <td>{entry.score} / 15</td>
              <td>{entry.score > 7 ? "✅ Passing" : "⚠️ Needs Help"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
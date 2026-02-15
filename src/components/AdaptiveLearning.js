import React from "react";
import "../App.css";

export default function AdaptiveLearning({ score }) {
  // Logic: Content adapts based on the user's last score
  const getLevel = () => {
    if (score === null) return "Take a quiz to see your level!";
    if (score <= 5) return "Beginner: Focus on Fundamentals";
    if (score <= 10) return "Intermediate: Building Logic";
    return "Advanced: Mastery & Optimization";
  };

  const recommendations = {
    "Beginner: Focus on Fundamentals": ["HTML Basics Video", "Intro to CSS Guide", "Variables in JS"],
    "Intermediate: Building Logic": ["Array Methods Tutorial", "DOM Manipulation", "Async/Await"],
    "Advanced: Mastery & Optimization": ["React Design Patterns", "Node.js Performance", "System Design"]
  };

  const level = getLevel();

  return (
    <div className="quiz-container">
      <h2>🧠 Adaptive Learning</h2>
      <div className="score-box">
        <h4>Current Status: {level}</h4>
      </div>
      <p>Based on your performance, we suggest:</p>
      <ul style={{ textAlign: "left" }}>
        {recommendations[level]?.map((item, i) => (
          <li key={i} style={{ margin: "10px 0", color: "#3498db" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
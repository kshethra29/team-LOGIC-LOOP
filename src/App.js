import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import AdaptiveLearning from "./components/AdaptiveLearning";
import TeacherDashboard from "./components/TeacherDashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); 
  const [lastScore, setLastScore] = useState(0); 
  const [activeTab, setActiveTab] = useState("adaptive"); 
  const [difficulty, setDifficulty] = useState("easy"); // Defaulted to easy so it's never "hidden"

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) { setUser(data); } 
      else { alert("Invalid credentials!"); }
    } catch (err) { alert("Backend Server Not Running!"); }
  };

  const startQuizLevel = (level) => {
    setDifficulty(level);
    setActiveTab("quiz");
  };

  if (!user) {
    return (
      <div className="App">
        <div className="brand-title"><h1>LogicLoop</h1></div>
        <div className="brand-subtitle">Gamified Learning & Quiz Platform</div>
        <div className="quiz-container login-box">
          <h2>🔒 Login</h2>
          <form onSubmit={handleLogin}>
            <input name="username" placeholder="Username" className="name-input" required />
            <input name="password" type="password" placeholder="Password" className="name-input" required />
            <button type="submit" className="start-btn">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="brand-title"><h1>LogicLoop</h1></div>
      <div className="brand-subtitle">Gamified Learning & Quiz Platform</div>

      <header className="header-nav">
        <span>{user.role === "teacher" ? "👩‍🏫" : "🎓"} <b>{user.username}</b></span>
        <button className="logout-btn" onClick={() => setUser(null)}>Logout</button>
      </header>

      {user.role === "student" ? (
        <>
          <div className="nav-menu">
            <button className={activeTab === "adaptive" ? "nav-btn active" : "nav-btn"} onClick={() => setActiveTab("adaptive")}>🗺️ Path</button>
            <button className={activeTab === "quiz" ? "nav-btn active" : "nav-btn"} onClick={() => setActiveTab("quiz")}>✍️ Take Quiz</button>
            <button className={activeTab === "leaderboard" ? "nav-btn active" : "nav-btn"} onClick={() => setActiveTab("leaderboard")}>🏆 Rankings</button>
          </div>

          <main className="content-area">
            {activeTab === "adaptive" && <AdaptiveLearning score={lastScore} onSelectLevel={startQuizLevel} />}
            {activeTab === "quiz" && (
              <Quiz 
                difficulty={difficulty} 
                userName={user.username} 
                onComplete={(score) => { setLastScore(score); setActiveTab("leaderboard"); }} 
              />
            )}
            {activeTab === "leaderboard" && <Leaderboard />}
          </main>
        </>
      ) : (
        <TeacherDashboard />
      )}
    </div>
  );
}

export default App;
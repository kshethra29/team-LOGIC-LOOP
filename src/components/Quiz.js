import { useState, useEffect } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAnswer(option) {
    const isCorrect = option === questions[current].answer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      // Send newScore immediately
      fetch("http://localhost:5000/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score: newScore }),
      });
    }
  }

  if (!started) {
    return (
      <div className="card">
        <h2>Quiz Master</h2>
        <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
        <button onClick={() => setStarted(true)} disabled={!name}>Start Quiz (15 Questions)</button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="card">
        <h2>Results</h2>
        <p>{name}, you got {score} out of {questions.length}!</p>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="card">
      <p>Question {current + 1} / {questions.length}</p>
      <h3>{questions[current].question}</h3>
      {questions[current].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
      ))}
    </div>
  );
}
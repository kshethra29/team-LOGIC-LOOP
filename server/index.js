const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- 1. User Database (In-Memory) ---
const users = [
  { username: "student1", password: "123", role: "student" },
  { username: "teacher1", password: "123", role: "teacher" }
];

// --- 2. The Full 30-Question Bank ---
// Note: Changed to 'let' so teachers can add questions later
let questionBank = [
  { id: 1, question: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Internet", "Advanced Interface", "Applied Information"], answer: "Artificial Intelligence" },
  { id: 2, question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
  { id: 3, question: "Which language is used for web frontend?", options: ["Python", "Java", "JavaScript", "C++"], answer: "JavaScript" },
  { id: 4, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
  { id: 5, question: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB" },
  { id: 6, question: "What is the brain of the computer?", options: ["RAM", "CPU", "GPU", "HDD"], answer: "CPU" },
  { id: 7, question: "Which company developed React?", options: ["Google", "Microsoft", "Meta", "Amazon"], answer: "Meta" },
  { id: 8, question: "Which symbol is used for IDs in CSS?", options: [".", "#", "*", "&"], answer: "#" },
  { id: 9, question: "What does HTTP stand for?", options: ["Hypertext Transfer Protocol", "Hyperlink Text Tech Power", "High Transfer Tech Protocol", "Home Text Transfer Program"], answer: "Hypertext Transfer Protocol" },
  { id: 10, question: "Which is NOT a programming language?", options: ["Python", "HTML", "Java", "Ruby"], answer: "HTML" },
  { id: 11, question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Linked List"], answer: "Stack" },
  { id: 12, question: "What is the file extension for JavaScript?", options: [".java", ".js", ".py", ".script"], answer: ".js" },
  { id: 13, question: "Which tag is used for an image in HTML?", options: ["<pic>", "<img>", "<src>", "<image>"], answer: "<img>" },
  { id: 14, question: "Who created Python?", options: ["Mark Zuckerberg", "Guido van Rossum", "Elon Musk", "Bill Gates"], answer: "Guido van Rossum" },
  { id: 15, question: "What is 10 in Binary?", options: ["1010", "1111", "1001", "1100"], answer: "1010" },
  { id: 16, question: "Which command clones a git repository?", options: ["git copy", "git fork", "git clone", "git download"], answer: "git clone" },
  { id: 17, question: "What is the default port for React?", options: ["5000", "8080", "3000", "4200"], answer: "3000" },
  { id: 18, question: "Which CSS property changes text color?", options: ["text-style", "font-color", "color", "background-color"], answer: "color" },
  { id: 19, question: "Is JavaScript single-threaded?", options: ["Yes", "No", "Only in Node", "Depends on OS"], answer: "Yes" },
  { id: 20, question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
  { id: 21, question: "Which loop runs at least once?", options: ["For", "While", "Do-While", "ForEach"], answer: "Do-While" },
  { id: 22, question: "Which is a Python web framework?", options: ["React", "Django", "Laravel", "Spring"], answer: "Django" },
  { id: 23, question: "Which company owns GitHub?", options: ["Google", "Apple", "Microsoft", "IBM"], answer: "Microsoft" },
  { id: 24, question: "What is the largest heading in HTML?", options: ["<h6>", "<head>", "<h1>", "<header>"], answer: "<h1>" },
  { id: 25, question: "Which operator checks value and type in JS?", options: ["==", "===", "=", "!="], answer: "===" },
  { id: 26, question: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "Stylish Question Language", "Standard Query Link"], answer: "Structured Query Language" },
  { id: 27, question: "Which is a CSS Framework?", options: ["Bootstrap", "Node.js", "Django", "Flask"], answer: "Bootstrap" },
  { id: 28, question: "What is the root of a Linux file system?", options: ["C:", "Home", "/", "Root"], answer: "/" },
  { id: 29, question: "Which HTML tag is used for a link?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
  { id: 30, question: "What is the result of 5 + '5' in JS?", options: ["10", "55", "Error", "NaN"], answer: "55" }
];

// --- 3. Helper Functions ---
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- 4. Endpoints ---

// User Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, role: user.role, username: user.username });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get 15 Random Questions
app.get("/questions", (req, res) => {
  const randomSet = shuffleArray(questionBank).slice(0, 15);
  res.json(randomSet);
});

// Teacher Adds New Question
app.post("/add-question", (req, res) => {
  const { question, options, answer } = req.body;
  const newQ = { id: questionBank.length + 1, question, options, answer };
  questionBank.push(newQ);
  res.json({ success: true, message: "Question added to memory!" });
});

// Get Leaderboard
let leaderboard = []; 
app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

// Submit Score
app.post("/submit-score", (req, res) => {
  const { name, score } = req.body;
  if (name && typeof score === 'number') {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
    res.json({ success: true, leaderboard });
  } else {
    res.status(400).json({ error: "Invalid name or score" });
  }
});

// --- 5. Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
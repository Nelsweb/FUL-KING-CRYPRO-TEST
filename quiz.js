const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let questions = [], index = 0, score = 0, timer = 1200;
const subject = new URLSearchParams(location.search).get('subject');
document.getElementById('subjectName').innerText = subject;

function startTimer() {
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    let mins = Math.floor(timer / 60);
    let secs = timer % 60;
    timerEl.innerText = \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
    if (timer-- <= 0) {
      clearInterval(interval);
      showResult();
    }
  }, 1000);
}

function loadQuestions() {
  db.ref("questions/" + subject).once("value", snapshot => {
    questions = Object.values(snapshot.val() || {});
    questions = questions.sort(() => Math.random() - 0.5);
    showQuestion();
    startTimer();
  });
}

function showQuestion() {
  const q = questions[index];
  if (!q) return showResult();
  const container = document.getElementById('questionContainer');
  container.innerHTML = \`<h3>Q\${index + 1}: \${q.question}</h3>\`;
  q.options.forEach((opt, i) => {
    container.innerHTML += \`<div><button class='btn' onclick='checkAnswer(this, "\${opt}", "\${q.answer}")'>\${String.fromCharCode(65+i)}. \${opt}</button></div>\`;
  });
}

function checkAnswer(btn, selected, correct) {
  const isCorrect = selected === correct;
  if (isCorrect) {
    btn.style.background = 'green';
    score++;
  } else {
    btn.style.background = 'red';
  }
  document.querySelectorAll('#questionContainer button').forEach(b => b.disabled = true);
}

function nextQuestion() {
  index++;
  showQuestion();
}

function showResult() {
  document.getElementById('quizBox').style.display = 'none';
  document.getElementById('resultBox').style.display = 'block';
  document.getElementById('scoreDisplay').innerText = \`You scored \${score} out of \${questions.length}\`;
  const user = JSON.parse(localStorage.getItem('user') || "{}");
  const record = { matric: user.matric, subject, score, time: new Date().toLocaleString() };
  db.ref('results').push(record);
}

document.getElementById('nextBtn').addEventListener('click', nextQuestion);
loadQuestions();

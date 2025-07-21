
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Add question
document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    question: question.value,
    options: [optA.value, optB.value, optC.value, optD.value],
    answer: answer.value,
  };
  db.ref("questions/" + subject.value).push(data);
  alert("Question added!");
  this.reset();
});

// View results
db.ref("results").on("value", snapshot => {
  const list = document.getElementById("resultsList");
  list.innerHTML = "";
  snapshot.forEach(child => {
    const r = child.val();
    const li = document.createElement("li");
    li.textContent = \`\${r.matric} - \${r.subject} - Score: \${r.score} - \${r.time}\`;
    list.appendChild(li);
  });
});

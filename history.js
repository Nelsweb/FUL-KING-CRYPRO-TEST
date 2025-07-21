
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const matric = localStorage.getItem("matric");
const list = document.getElementById("historyList");

db.ref("results").orderByChild("matric").equalTo(matric).once("value", snapshot => {
  if (!snapshot.exists()) {
    list.innerHTML = "<li>No quiz history found.</li>";
    return;
  }

  snapshot.forEach(child => {
    const r = child.val();
    const li = document.createElement("li");
    li.textContent = \`\${r.subject} - Score: \${r.score} - \${r.time}\`;
    list.appendChild(li);
  });
});

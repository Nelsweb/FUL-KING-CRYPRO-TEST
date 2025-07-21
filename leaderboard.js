
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

db.ref("results").once("value", snapshot => {
  const all = [];
  snapshot.forEach(child => {
    const r = child.val();
    all.push(r);
  });

  all.sort((a, b) => b.score - a.score);
  const top10 = all.slice(0, 10);
  const list = document.getElementById("leaderboardList");
  top10.forEach((r, i) => {
    const li = document.createElement("li");
    li.textContent = \`\${i + 1}. \${r.matric} - \${r.subject} - \${r.score}\`;
    list.appendChild(li);
  });
});

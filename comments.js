
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");
const matric = localStorage.getItem("matric");

commentForm.addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("commentMsg").value;
  const subject = localStorage.getItem("lastSubject") || "General";
  db.ref("comments/" + subject).push({ user: matric, msg, time: new Date().toLocaleString() });
  commentForm.reset();
});

db.ref("comments").on("value", snap => {
  commentList.innerHTML = "";
  snap.forEach(subjectSnap => {
    subjectSnap.forEach(commentSnap => {
      const c = commentSnap.val();
      const li = document.createElement("li");
      li.textContent = `[${c.time}] ${c.user}: ${c.msg}`;
      commentList.appendChild(li);
    });
  });
});

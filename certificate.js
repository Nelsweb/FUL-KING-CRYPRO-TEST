
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("matric");
  const subject = localStorage.getItem("lastSubject") || "a subject";
  document.getElementById("certName").textContent = name;
  document.getElementById("certSubject").textContent = subject;
  document.getElementById("certDate").textContent = new Date().toLocaleDateString();
});

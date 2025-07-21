
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.createElement("button");
  toggle.textContent = "🌓 Toggle Mode";
  toggle.className = "btn";
  toggle.style.position = "fixed";
  toggle.style.bottom = "10px";
  toggle.style.right = "10px";
  document.body.appendChild(toggle);

  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    const sound = new Audio("../assets/toggle.mp3");
    sound.play();
  };
});

function openAdminPrompt() {
  const code = prompt("Enter the secret code");
  if (code === "Glory" || code === "Gladys") {
    localStorage.setItem('admin', 'true');
    window.location.href = "admin/dashboard.html";
  } else {
    alert("Access denied.");
  }
}

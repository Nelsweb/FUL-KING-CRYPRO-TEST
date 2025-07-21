
const tipsRef = firebase.database().ref("examTips");
const tipList = document.getElementById("tipList");
const adminMatric = localStorage.getItem("matric");
if (adminMatric === "Glory" || adminMatric === "Gladys") {
  document.getElementById("tipAdmin").style.display = "block";
}

function addTip() {
  const newTip = document.getElementById("newTip").value;
  tipsRef.push(newTip);
  document.getElementById("newTip").value = "";
}

tipsRef.on("value", snap => {
  tipList.innerHTML = "";
  snap.forEach(child => {
    const li = document.createElement("li");
    li.textContent = child.val();
    tipList.appendChild(li);
  });
});

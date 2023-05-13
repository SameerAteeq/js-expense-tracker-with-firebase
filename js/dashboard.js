const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

function logout(e) {
  localStorage.removeItem("user");
  window.location.href = "../html files/login.html";
}

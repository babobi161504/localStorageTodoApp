function checkLoggedIn() {
  let user =
    localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "../HTML/main.html";
  } else {
    user = JSON.parse(user);
    document.getElementById(
      "welcome-message"
    ).textContent = `Hello ${user.username}. You are logged in`;
  }
}
document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");
  window.location.href = "../HTML/signIn.html";
});
checkLoggedIn();

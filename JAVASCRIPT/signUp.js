document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userExists = users.some((user) => user.username === username);

  if (userExists) {
    alert("Username already exists. Please choose a different username.");
  } else {
    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully!");
    window.location.href = "../HTML/signIn.html";
  }
});
document.getElementById("signin-button").addEventListener("click", function () {
  window.location.href = '../HTML/signIn.html';
});
function checkLoggedIn() {
  if (
    localStorage.getItem("rememberMe") === "true" ||
    sessionStorage.getItem("currentUser")
  ) {
    window.location.href = "../HTML/main.html";
  }
}
checkLoggedIn();

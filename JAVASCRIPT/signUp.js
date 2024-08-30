document.getElementById('sign-up-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const isUserExists = users.some((user) => user.username === username);

  if (isUserExists) {
    alert("Username already exists. Please choose a different username.");
  } else {
    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully!");
    window.location.href = "../HTML/signIn.html";
  }
});
document.getElementById("sign-in-button").addEventListener("click", function () {
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

document
  .getElementById("sign-up-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    function generateUserId() {
      return (
        username +
        "_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2, 15)
      );
    }

    const userId = generateUserId();
    const isUserExists = users.some((user) => user.username === username);

    if (isUserExists) {
      alert("Username already exists. Please choose a different username.");
    } else {
      users.push({ username: username, password: password, userId: userId });
      localStorage.setItem("users", JSON.stringify(users));
      alert("User registered successfully!");
      window.location.href = "../pages/signIn.html";
    }
  });
document
  .getElementById("sign-in-button")
  .addEventListener("click", function () {
    window.location.href = "../pages/signIn.html";
  });
function checkLoggedIn() {
  if (localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")) {
    window.location.href = "../pages/main.html";
  }
}
checkLoggedIn();

document
  .getElementById("sign-in-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

      if (user) {
        if (rememberMe) {
        
          localStorage.setItem("currentUser", JSON.stringify(user));

        } else {

          sessionStorage.setItem("currentUser", JSON.stringify(user));
        }
        sessionStorage.setItem("userId", user.userId);

        window.location.href = "../pages/main.html";
      } else {
        alert("Invalid username or password");
      }
  });

document
  .getElementById("sign-up-button")
  .addEventListener("click", function () {
    window.location.href = "../pages/signUp.html";
  });

function checkRememberMe() {

  if (localStorage.getItem("currentUser")) {
    window.location.href = "../pages/main.html";
  }
}
checkRememberMe();
if (sessionStorage.getItem("currentUser")) {
  window.location.href = "../pages/main.html";
}

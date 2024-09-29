document
  .getElementById("sign-in-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let rememberMe = document.getElementById("remember-me").checked;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (rememberMe) {
        
        localStorage.setItem("rememberMe", JSON.stringify(true));

        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        
        localStorage.setItem("rememberMe", JSON.stringify(false));

        sessionStorage.setItem("currentUser", JSON.stringify(user));
      }
      sessionStorage.setItem("userId", user.userId);

      window.location.href = "../page/main.html";
    } else {
      alert("Invalid username or password");
    }
  });

document
  .getElementById("sign-up-button")
  .addEventListener("click", function () {
    window.location.href = "../page/signUp.html";
  });

function checkRememberMe() {

  if (localStorage.getItem("rememberMe") === JSON.stringify(true)) {
    window.location.href = "../page/main.html";
  }
}
checkRememberMe();
if (sessionStorage.getItem("currentUser")) {
  window.location.href = "../page/main.html";
}

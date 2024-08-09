document.getElementById('signin-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let rememberMe = document.getElementById('remember-me').checked;
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.setItem('rememberMe', 'false');
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    window.location.href = '../HTML/main.html';
  } else {
    alert('Invalid username or password');
  }
});

document.getElementById('signup-button').addEventListener('click', function () {
  
  window.location.href = '../HTML/signUp.html';
});

function checkRememberMe() {
  if (localStorage.getItem('rememberMe') === 'true') {
    window.location.href = '../HTML/main.html';
  }
}
checkRememberMe();
if (sessionStorage.getItem('currentUser')) {
  window.location.href = '../HTML/main.html';
}

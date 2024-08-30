function checkLoggedIn() {
  let user =
    localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "../HTML/main.html";
  } else {
    const userJson = JSON.parse(user);
    document.getElementById(
      "welcome-message"
    ).textContent = `Hello ${userJson.username}. You are logged in`;
  }
}
document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");
  window.location.href = "../HTML/signIn.html";
});

checkLoggedIn();

// todoApp

document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("id-todo-input");
  const addButton = document.getElementById("id-add-button");
  const todoList = document.getElementById("id-todo-list");
  const filterDropdown = document.querySelector(".filter");
  const cancelButton = document.querySelector(".cancel")

  
  addButton.addEventListener("click", function () {
    const taskName = todoInput.value.trim();
    if (taskName !== "") {
      const taskDiv = document.createElement("div");
      taskDiv.className = "todo-item"

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskName;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete"

      editButton.addEventListener("click", function () {
        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.value = taskSpan.textContent;
        taskDiv.replaceChild(taskInput, taskSpan);

        // Create a save button
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        taskDiv.replaceChild(saveButton, editButton);

        saveButton.addEventListener("click", function () {
          taskSpan.textContent = taskInput.value;
          taskDiv.replaceChild(taskSpan, taskInput);
          taskDiv.replaceChild(editButton, saveButton);
        });
      });

      //Delete task
      deleteButton.addEventListener("click", function() {
        todoList.removeChild(taskDiv)
        filterTasks()
      })

      //Checkbox task
      checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
          taskDiv.classList.add('completed');
          todoList.appendChild(taskDiv);
        } else {
          taskDiv.classList.remove('completed')
          
        }
        filterTasks()
      })

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(taskSpan);
      taskDiv.appendChild(editButton);
      taskDiv.appendChild(deleteButton);
      todoList.appendChild(taskDiv);

      todoInput.value = "";
      filterTasks();
    
    } else if (taskName === '') {
      alert('Please input task name before adding a task');
    }
  });

  // Cancel-input
  cancelButton.addEventListener("click",function() {
    todoInput.value = ''
  })
  
  // Filter task
  function filterTasks() {
    const filterValue = filterDropdown.value
    const tasks = todoList.querySelectorAll('.todo-item')

    tasks.forEach(task => {
      const isCompleted = task.classList.contains('completed')

      if (filterValue === 'all') {
        task.style.display = 'flex'
      } else if (filterValue === 'done') {
        task.style.display = isCompleted ? 'flex' : 'none'
      } else if (filterValue === 'undone') {
        task.style.display = isCompleted ? 'none' : 'flex'
      }
    })
  }

  filterDropdown.addEventListener("change", filterTasks)
})
// function checkLoggedIn() {
//   const userJson =
//     localStorage.getItem("currentUser") ||
//     sessionStorage.getItem("currentUser");
//   if (!userJson) {
//     window.location.href = "../HTML/main.html";
//   } else {
//     const user = JSON.parse(userJson);
//     document.getElementById(
//       "welcome-message"
//     ).textContent = `Hello ${user.username}. You are logged in`;
//   }
// }
// document.getElementById("logout-button").addEventListener("click", function () {
//   localStorage.removeItem("currentUser");
//   sessionStorage.removeItem("currentUser");
//   localStorage.removeItem("rememberMe");
//   window.location.href = "../HTML/signIn.html";
// });

// checkLoggedIn();

// // todoApp 

// document.addEventListener("DOMContentLoaded", function () {
//   const todoInput = document.getElementById("id-todo-input");
//   const addButton = document.getElementById("id-add-button");
//   const todoList = document.getElementById("id-todo-list");
//   const filterDropdown = document.querySelector(".filter");
//   const cancelButton = document.querySelector(".cancel")

  
//   addButton.addEventListener("click", function () {
//     const taskName = todoInput.value.trim();
//     if (taskName !== "") {
//       const taskDiv = document.createElement("div");
//       taskDiv.className = "todo-item"

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
      
//       const taskSpan = document.createElement("span");
//       taskSpan.textContent = taskName;

//       const editButton = document.createElement("button");
//       editButton.textContent = "Edit";

//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.className = "delete"

//       editButton.addEventListener("click", function () {
//         const taskInput = document.createElement("input");
//         taskInput.type = "text";
//         taskInput.value = taskSpan.textContent;
//         taskDiv.replaceChild(taskInput, taskSpan);

//         // Create a save button
//         const saveButton = document.createElement("button");
//         saveButton.textContent = "Save";
//         taskDiv.replaceChild(saveButton, editButton);

//         saveButton.addEventListener("click", function () {
//           taskSpan.textContent = taskInput.value;
//           taskDiv.replaceChild(taskSpan, taskInput);
//           taskDiv.replaceChild(editButton, saveButton);
//         });
//       });

//       //Delete task
//       deleteButton.addEventListener("click", function() {
//         todoList.removeChild(taskDiv)
//         filterTasks()
//       })

//       //Checkbox task
//       checkbox.addEventListener("change", function() {
//         if (checkbox.checked) {
//           taskDiv.classList.add('completed');
//           todoList.appendChild(taskDiv);
//         } else {
//           taskDiv.classList.remove('completed')
          
//         }
//         filterTasks()
//       })

//       taskDiv.appendChild(checkbox);
//       taskDiv.appendChild(taskSpan);
//       taskDiv.appendChild(editButton);
//       taskDiv.appendChild(deleteButton);
//       todoList.appendChild(taskDiv);

//       todoInput.value = "";
//       filterTasks();
    
//     } else if (taskName === '') {
//       alert('Please input task name before adding a task');
//     }
//   });

//   // Cancel-input
//   cancelButton.addEventListener("click",function() {
//     todoInput.value = ''
//   })
  
//   // Filter task
//   function filterTasks() {
//     const filterValue = filterDropdown.value
//     const tasks = todoList.querySelectorAll('.todo-item')

//     tasks.forEach(task => {
//       const isCompleted = task.classList.contains('completed')

//       if (filterValue === 'all') {
//         task.style.display = 'flex'
//       } else if (filterValue === 'done') {
//         task.style.display = isCompleted ? 'flex' : 'none'
//       } else if (filterValue === 'undone') {
//         task.style.display = isCompleted ? 'none' : 'flex'
//       }
//     })
//   }

//   filterDropdown.addEventListener("change", filterTasks)
// })
function checkLoggedIn() {
  const userJson = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
  if (!userJson) {
    window.location.href = "../HTML/main.html";
  } else {
    const user = JSON.parse(userJson);
    document.getElementById("welcome-message").textContent = `Hello ${user.username}. You are logged in`;
  }
}

document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");
  window.location.href = "../HTML/signIn.html";
});

checkLoggedIn();

// TodoApp
document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("id-todo-input");
  const addButton = document.getElementById("id-add-button");
  const todoList = document.getElementById("id-todo-list");
  const filterDropdown = document.querySelector(".filter");
  const cancelButton = document.querySelector(".cancel");
  
  const userId = sessionStorage.getItem("userId");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = tasks.filter(task => task.ownerId === userId);

    userTasks.forEach(task => {
      addTaskToUI(task);
    });
  }

  function addTaskToUI(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "todo-item";
    if (task.isDone) {
      taskDiv.classList.add('completed');
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isDone;
    
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.name;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    editButton.addEventListener("click", function () {
      const taskInput = document.createElement("input");
      taskInput.type = "text";
      taskInput.value = taskSpan.textContent;
      taskDiv.replaceChild(taskInput, taskSpan);

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      taskDiv.replaceChild(saveButton, editButton);

      saveButton.addEventListener("click", function () {
        taskSpan.textContent = taskInput.value;
        taskDiv.replaceChild(taskSpan, taskInput);
        taskDiv.replaceChild(editButton, saveButton);

        // Update task in localStorage
        updateTask(task.id, taskInput.value, checkbox.checked);
      });
    });

    // Delete task
    deleteButton.addEventListener("click", function () {
      todoList.removeChild(taskDiv);
      removeTask(task.id);
      filterTasks();
    });

    // Checkbox task
    checkbox.addEventListener("change", function () {
      task.isDone = checkbox.checked;
      if (checkbox.checked) {
        taskDiv.classList.add('completed');
      } else {
        taskDiv.classList.remove('completed');
      }
      updateTask(task.id, taskSpan.textContent, task.isDone);
      filterTasks();
    });

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);
    todoList.appendChild(taskDiv);
  }

  function updateTask(id, name, isDone) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: name, isDone: isDone };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addButton.addEventListener("click", function () {
    const taskName = todoInput.value.trim();
    if (taskName !== "") {
      const taskId = 'task_' + Date.now();
      const newTask = { id: taskId, name: taskName, isDone: false, ownerId: userId };

      addTaskToUI(newTask);

      // Lưu task mới vào localStorage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      todoInput.value = "";
      filterTasks();
    } else if (taskName === '') {
      alert('Please input task name before adding a task');
    }
  });

  // Cancel input
  cancelButton.addEventListener("click", function () {
    todoInput.value = '';
  });

  // Filter task
  function filterTasks() {
    const filterValue = filterDropdown.value;
    const tasks = todoList.querySelectorAll('.todo-item');

    tasks.forEach(task => {
      const isCompleted = task.classList.contains('completed');

      if (filterValue === 'all') {
        task.style.display = 'flex';
      } else if (filterValue === 'done') {
        task.style.display = isCompleted ? 'flex' : 'none';
      } else if (filterValue === 'undone') {
        task.style.display = isCompleted ? 'none' : 'flex';
      }
    });
  }

  filterDropdown.addEventListener("change", filterTasks);

  loadTasks();
});

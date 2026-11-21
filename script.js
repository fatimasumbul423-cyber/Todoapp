const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask() {
  let task = input.value.trim();
  if (task === "") return;

  let li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${task}</span>
    <span class="delete">X</span>
  `;

  taskList.appendChild(li);

  // Toggle complete
  li.querySelector(".task-text").addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Delete
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  input.value = "";
}

function init() {
  addBtn.addEventListener("click", addTask);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });
}

init();





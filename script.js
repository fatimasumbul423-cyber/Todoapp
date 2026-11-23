const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");

const STORAGE_KEY = "todo-tasks";
let tasks = [];

function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage unavailable; the app still works for this session.
  }
}

function updateSummary() {
  const total = tasks.length;
  const remaining = tasks.filter((t) => !t.completed).length;

  emptyState.hidden = total > 0;
  taskCount.textContent =
    total === 0
      ? "No tasks yet"
      : `${remaining} of ${total} task${total === 1 ? "" : "s"} remaining`;
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.classList.toggle("completed", task.completed);

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text; // textContent prevents HTML injection

  const del = document.createElement("button");
  del.className = "delete";
  del.type = "button";
  del.setAttribute("aria-label", "Delete task");
  del.textContent = "\u2715";

  text.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed", task.completed);
    saveTasks();
    updateSummary();
  });

  del.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    saveTasks();
    updateSummary();
  });

  li.append(text, del);
  return li;
}

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const task = { id: Date.now().toString(), text, completed: false };
  tasks.push(task);
  taskList.appendChild(createTaskElement(task));

  saveTasks();
  updateSummary();
  input.value = "";
  input.focus();
}

function init() {
  loadTasks();
  tasks.forEach((task) => taskList.appendChild(createTaskElement(task)));
  updateSummary();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });
}

init();
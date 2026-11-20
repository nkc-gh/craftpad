// DOM element references for onboarding, forms, and task containers
const welcomeScreen = document.querySelector("#welcome-screen");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const taskApp = document.querySelector("#task-app");
const form = document.querySelector("#task-form");
const pendingTasks = document.querySelector("#pending-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const sortDropdown = document.querySelector("#sort-tasks");
const sortButtons = document.querySelectorAll("[data-sort]");
const welcomeName = document.querySelector("#welcome-name");

// localStorage keys used to persist data in the browser across sessions
const storageKey = "todo-tasks";
const nameStorageKey = "todo-user-name";

// application state
let tasks = loadTasks(); // loads saved task array on startup
let sortBy = "time";     // default sort method: "time" (created order), "date", or "alphabetical"

// loads and parses saved tasks from browser localStorage
function loadTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(storedTasks)) {
      return [];
    }

    // validate and normalize each stored task item to prevent runtime errors
    return storedTasks.map((task) => ({
      id: String(task.id ?? createId()),
      title: String(task.title ?? ""),
      date: String(task.date ?? ""),
      time: String(task.time ?? ""),
      createdAt: Number(task.createdAt) || 0,
      completed: Boolean(task.completed),
    }));
  } catch (error) {
    console.error("Could not load saved tasks.", error);
    return [];
  }
}

// retrieves the saved user name from localStorage
function loadUserName() {
  try {
    return localStorage.getItem(nameStorageKey) ?? "";
  } catch (error) {
    console.error("Could not load the saved name.", error);
    return "";
  }
}

// saves the user's name to localStorage
function saveUserName(name) {
  try {
    localStorage.setItem(nameStorageKey, name);
  } catch (error) {
    console.error("Could not save the name.", error);
  }
}

// writes the current tasks array to localStorage as a JSON string
function saveTasks() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    console.error("Could not save tasks.", error);
  }
}

// formats an ISO date string (YYYY-MM-DD) into readable British English format (e.g., "15 November 2026")
function formatDate(dateValue) {
  if (!dateValue) {
    return "No date";
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

// formats 24-hour time string (HH:MM) into 12-hour format with AM/PM (e.g., "3:30 PM")
function formatTime(timeValue) {
  if (!timeValue) {
    return "No time";
  }

  const [hours, minutes] = timeValue.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(1970, 0, 1, hours, minutes));
}

// returns a sorted shallow copy of the tasks array based on the active sortBy criterion
function sortTasks(taskList) {
  return [...taskList].sort((firstTask, secondTask) => {
    if (sortBy === "alphabetical") {
      return firstTask.title.localeCompare(secondTask.title); // A-Z sorting
    }

    if (sortBy === "time") {
      return firstTask.createdAt - secondTask.createdAt; // oldest created first
    }

    // sort by scheduled deadline date and time
    const firstDate = `${firstTask.date}T${firstTask.time || "23:59"}`;
    const secondDate = `${secondTask.date}T${secondTask.time || "23:59"}`;
    return firstDate.localeCompare(secondDate);
  });
}

// creates and returns the HTML card element for a single task
function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.taskId = task.id;

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const details = document.createElement("div");
  details.className = "task-details";

  const date = document.createElement("span");
  date.className = "task-date";
  date.textContent = formatDate(task.date);

  const time = document.createElement("span");
  time.className = "task-time";
  time.textContent = formatTime(task.time);

  details.append(date, time);

  // action buttons container
  const actions = document.createElement("div");
  actions.className = "task-actions";

  // toggle completed status button
  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.dataset.action = "toggle-complete";
  completeButton.type = "button";
  completeButton.setAttribute(
    "aria-label",
    task.completed ? `Restore ${task.title}` : `Complete ${task.title}`,
  );
  completeButton.textContent = task.completed ? "Restore" : "Completed";

  // delete task button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.dataset.action = "delete";
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
  deleteButton.textContent = "Delete";

  actions.append(completeButton, deleteButton);
  card.append(title, details, actions);

  return card;
}

// clears and re-renders both pending and completed task lists in the UI
function renderTasks() {
  pendingTasks.replaceChildren();
  completedTasks.replaceChildren();

  // filter tasks into pending vs completed, then apply sorting
  const pending = sortTasks(tasks.filter((task) => !task.completed));
  const completed = sortTasks(tasks.filter((task) => task.completed));

  pending.forEach((task) => pendingTasks.append(createTaskCard(task)));
  completed.forEach((task) => completedTasks.append(createTaskCard(task)));

  // hide the section entirely if it contains zero tasks
  pendingTasks.closest(".task-section").hidden = pending.length === 0;
  completedTasks.closest(".task-section").hidden = completed.length === 0;
}

// generates a unique ID using current timestamp and random hex digits
function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// handles new task submission from the input form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents standard page reload on submit

  const formData = new FormData(form);
  tasks.push({
    id: createId(),
    title: String(formData.get("title") ?? "").trim(),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
    createdAt: Date.now(),
    completed: false,
  });

  saveTasks();
  renderTasks();
  form.reset();
});

// check if a username was previously stored in this browser
nameInput.value = loadUserName();

// handles onboarding name form submission
nameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  if (!name) {
    return;
  }

  saveUserName(name);
  welcomeName.textContent = name;
  welcomeScreen.hidden = true; // hide onboarding screen
  taskApp.hidden = false;       // show main task application
});

// event delegation handler for complete and delete buttons inside task lists
function handleTaskAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const card = button.closest("[data-task-id]");
  const task = tasks.find((item) => item.id === card?.dataset.taskId);
  if (!task) {
    return;
  }

  if (button.dataset.action === "delete") {
    tasks = tasks.filter((item) => item.id !== task.id); // removes task from array
  } else {
    task.completed = !task.completed; // flips completion status
  }

  saveTasks();
  renderTasks();
}

// attach delegated listeners to both list containers
pendingTasks.addEventListener("click", handleTaskAction);
completedTasks.addEventListener("click", handleTaskAction);

// updates the sorting method and synchronizes both desktop buttons and mobile dropdown
function changeSort(value) {
  sortBy = value;
  sortDropdown.value = value;
  sortButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.sort === value);
  });
  renderTasks();
}

// dropdown change event for mobile screens
sortDropdown.addEventListener("change", (event) => {
  changeSort(event.target.value);
});

// button click events for desktop sort bar
sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeSort(button.dataset.sort);
  });
});

// initial render on page load
renderTasks();

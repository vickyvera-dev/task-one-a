// ---------------- INITIAL DATA ----------------
let dueDate = new Date();
dueDate.setHours(dueDate.getHours() + 5);

let originalData = {
  title: "Build UI Card",
  desc: "Create a clean and testable todo card component with advanced interactivity.",
  priority: "high",
  status: "In Progress"
};

let task = {
  title: "Build UI Card",
  desc: "Create a clean and testable todo card component with advanced interactivity.",
  priority: "high",
  status: "pending",
  dueDate: new Date(Date.now() + 5 * 60 * 1000)
};



// ---------------- ELEMENTS ----------------
const titleEl = document.getElementById("todo-title");
const descEl = document.getElementById("desc-container");
const timeEl = document.getElementById("time-remaining");
const statusControl = document.getElementById("status-control");
const checkbox = document.getElementById("checkbox");
const priorityEl = document.querySelector("[data-testid='test-todo-priority']");
const dueDateEl = document.getElementById("due-date");
const timeRemainingEl = document.getElementById("time-remaining");

/** ---- INIT ---- **/
statusControl.value = task.status;
dueDateEl.dateTime = task.dueDate.toISOString();
dueDateEl.textContent = task.dueDate.toLocaleString();

/** ---- STATUS CHANGE ---- **/
function changeStatus(value) {
  task.status = value;

  if (value === "done") {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }

  updateUI();
}

/** ---- CHECKBOX CHANGE ---- **/
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    task.status = "done";
    statusControl.value = "done";
  } else {
    task.status = "overdue";
    statusControl.value = "overdue";
  }

  updateUI();
});

/** ---- TIME LOGIC ---- **/
function updateTime() {
  const now = new Date();
  const diff = task.dueDate - now;

  // Completed
  if (task.status === "done") {
    timeRemainingEl.textContent = "Completed";
    timeRemainingEl.dataset.state = "done";
    checkbox.checked = true;
    return;
  }

  // Overdue
  if (diff <= 0) {
    timeRemainingEl.textContent = "Overdue";
    timeRemainingEl.dataset.state = "overdue";
    return;
  }

  // Active (countdown)
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  timeRemainingEl.textContent = `${mins}m ${secs}s remaining`;
  timeRemainingEl.dataset.state = "active";
}
/** ---- UPDATE ---- **/
function updateUI() {
  if (task.status === "done") {
    timeRemainingEl.textContent = "Completed";
  } else if (task.status === "In Progress") {
    timeRemainingEl.textContent = "In Progress";
  }
}

/** ---- AUTO TIMER ---- **/
setInterval(updateTime, 1000);

/** ---- INITIAL RUN ---- **/
updateTime();


// ---------------- PRIORITY ----------------
function changePriority(value) {
  const text = value.charAt(0).toUpperCase() + value.slice(1);
  priorityEl.innerText = text;

  if (value === "high") {
    priorityEl.style.background = "#ffeaea";
    priorityEl.style.color = "#ff4d4f";
  } else if (value === "medium") {
    priorityEl.style.background = "#fff7e6";
    priorityEl.style.color = "#faad14";
  } else {
    priorityEl.style.background = "#f6ffed";
    priorityEl.style.color = "#52c41a";
  }
}

// ---------------- EXPAND / COLLAPSE ----------------
function toggleDescription(event) {
  const box = document.getElementById("desc-container");
  const btn = event.target;

  const isCollapsed = box.classList.contains("collapsed");

  box.classList.toggle("collapsed");
  btn.innerText = isCollapsed ? "Collapse" : "Expand";
  btn.setAttribute("aria-expanded", String(!isCollapsed));
}

function renderTask() {
  titleEl.innerText = task.title;
  descEl.innerText = task.desc;

  statusControl.value = task.status;
  checkbox.checked = task.status === "done";

  dueDateEl.dateTime = task.dueDate.toISOString();
  dueDateEl.textContent = task.dueDate.toLocaleString();

  changePriority(task.priority);

  // Reset state (important)
  if (task.status !== "done") {
    timeRemainingEl.dataset.state = "active";
  }
}
// ---------------- EDIT MODE ----------------
function openEditMode() {
  document.getElementById("edit-form").classList.remove("hidden");

  document.getElementById("edit-title").value = task.title;
  document.getElementById("edit-desc").value = task.desc;

  // Optional fields
  const priorityInput = document.getElementById("edit-priority");
  const statusInput = document.getElementById("edit-status");
  const dueDateInput = document.getElementById("edit-due-date");

  if (priorityInput) priorityInput.value = task.priority;
  if (statusInput) statusInput.value = task.status;
  if (dueDateInput) {
    dueDateInput.value = task.dueDate.toISOString().slice(0, 16);
  }
}


function saveEdit() {
  // Update DATA
  task.title = document.getElementById("edit-title").value;
  task.desc = document.getElementById("edit-desc").value;

  // Optional (if you add these inputs)
  const priorityInput = document.getElementById("edit-priority");
  const statusInput = document.getElementById("edit-status");
  const dueDateInput = document.getElementById("edit-due-date");

  if (priorityInput) task.priority = priorityInput.value;
  if (statusInput) task.status = statusInput.value;
  if (dueDateInput) task.dueDate = new Date(dueDateInput.value);

  // Re-render EVERYTHING
  renderTask();

  // Close form
  document.getElementById("edit-form").classList.add("hidden");
}

function cancelEdit() {
  document.getElementById("edit-form").classList.add("hidden");
}

// ---------------- DELETE ----------------
function deleteTask() {
  alert("Task deleted (UI only)");
}
// ---------------- STATE ----------------
let task = {
  title: "Build UI Card",
  desc: "Create a clean and testable todo card component.",
  priority: "high",
  status: "pending", // pending | in progress | done
  dueDate: new Date(Date.now() + 5 * 60 * 1000)
};

// ---------------- ELEMENTS ----------------
const titleEl = document.getElementById("todo-title");
const descEl = document.getElementById("desc-container");
const timeEl = document.getElementById("time-remaining");
const statusControl = document.getElementById("status-control");
const checkbox = document.getElementById("checkbox");
const priorityEl = document.querySelector("[data-testid='test-todo-priority']");
const priorityControl = document.getElementById("priority-control"); 
const dueDateEl = document.getElementById("due-date");

// ---------------- DERIVED STATE ----------------
function getTimeState() {
  const now = new Date();

  if (task.status === "done") return "done";

  return now >= task.dueDate ? "overdue" : "active";
}

function formatDate(date) {
  return date.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
// ---------------- RENDER ----------------
function render() {

  titleEl.innerText = task.title;
  descEl.innerText = task.desc;
    const state = getTimeState();

  // show actual due date
  dueDateEl.dateTime = task.dueDate.toISOString();
  dueDateEl.textContent = `Due: ${formatDate(task.dueDate)}`;

  // sync priority
  changePriority(task.priority);

  if (state === "done") {
    checkbox.checked = true;
    statusControl.value = "done";

    timeEl.textContent = "Completed";
    timeEl.style.color = "green";

    titleEl.classList.add("done");
    return;
  }

  if (state === "overdue") {
    checkbox.checked = false;
    statusControl.value = "in progress";

    timeEl.textContent = "Overdue";
    timeEl.style.color = "red";

    titleEl.classList.remove("done");
    return;
  }

  checkbox.checked = false;
  statusControl.value = "in progress";

  const diff = task.dueDate - new Date();
  const mins = Math.floor(diff / 60000);

  timeEl.textContent = `Due in ${mins} min`;
  timeEl.style.color = "black";

  titleEl.classList.remove("done");
}
// ---------------- USER ACTIONS ----------------
function changeStatus(value) {
  if (value === "done") {
    task.status = "done";
  } else {
    task.status = "in progress";
  }

  render();
}

checkbox.addEventListener("change", () => {
  task.status = checkbox.checked ? "done" : "in progress";
  render();
});

// ---------------- AUTO TIME UPDATE ----------------
setInterval(render, 30000);

// ---------------- INIT ----------------
render();




/*  PRIORITY */
function changePriority(value) {
  task.priority = value;

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

priorityControl.addEventListener("change", (e) => {
  changePriority(e.target.value);
});


// ---------------- EXPAND / COLLAPSE ----------------
function toggleDescription(event) {
  const box = document.getElementById("desc-container");
  const btn = event.target;

  if (box.classList.contains("collapsed")) {
    box.classList.remove("collapsed");
    btn.innerText = "Collapse";
    btn.setAttribute("aria-expanded", "true");
  } else {
    box.classList.add("collapsed");
    btn.innerText = "Expand";
    btn.setAttribute("aria-expanded", "false");
  }
}

// ---------------- EDIT MODE ----------------
function openEditMode() {
  document.getElementById("edit-form").classList.remove("hidden");

  document.getElementById("edit-title").value = task.title;
  document.getElementById("edit-desc").value = task.desc;

  // Optional fields (recommended for Stage 1a)
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
  //  update state
  task.title = document.getElementById("edit-title").value;
  task.desc = document.getElementById("edit-desc").value;

  const priorityInput = document.getElementById("edit-priority");
  const statusInput = document.getElementById("edit-status");
  const dueDateInput = document.getElementById("edit-due-date");

  if (priorityInput) task.priority = priorityInput.value;
  if (statusInput) task.status = statusInput.value;
  if (dueDateInput) task.dueDate = new Date(dueDateInput.value);

  //  re-render UI from state
  render();

  // close form
  document.getElementById("edit-form").classList.add("hidden");
}

function cancelEdit() {
  document.getElementById("edit-form").classList.add("hidden");
}
// ---------------- DELETE ----------------
function deleteTask() {
  alert("Task deleted (UI only)");
}
renderTask();
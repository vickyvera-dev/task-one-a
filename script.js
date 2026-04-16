let dueDate = new Date();
dueDate.setHours(dueDate.getHours() + 5);

let originalData = {
  title: "Build UI Card",
  desc: "Create a clean and testable todo card component with advanced interactivity.",
  priority: "high",
  status: "Pending"
};

//Elements
const titleEl = 
document.getElementById("todo-title");
const descEl = document.getElementById("desc-container");
const timeEl = document.getElementById("time-remaining");
const statusControl = document.getElementById("status-control");
const checkbox = document.getElementById("checkbox");
const priorityEl = document.querySelector("[data-testid='test-todo-priority']");

//---Time logic
function updateTime() {
  const now = new Date();

  if (statusControl.value === "Done") {
    timeEl.ELEMENT_NODE.innerText = "Completed";
    return;
  }
  
  const diff = dueDate - now;

  if (checkbox.checked) return;

  if (diff <=0) {
    timeEl.innerText = "Overdue";
    timeEl.style.color = "red";
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const mins = Math.floor((diff / (1000 * 60)) % 60);

  if (hours > 0) {
    timeEl.innerText = `Due in ${hours} hours`;
    } else {
      timeEl.innerText = `Due in ${mins} minutes`;
    }
}

setInterval(updateTime, 60000);
updateTime();


//--status
function changeStatus(value) {
  if (value === "Done") {
    checkbox.checked = true;
    titleEl.classList.add("done");
  } else {
    checkbox.checked = false;
    titleEl.classList.remove("done");
  }
}

//----checkbox sync
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    statusControl.value = "Done";
    changeStatus("Done");
  } else {
    statusControl.value = "Pending";
    changeStatus("Pending");
  }
});



//--priority
/*  PRIORITY */
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
function toggleDescription() {
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

  document.getElementById("edit-title").value = titleEl.innerText;
  document.getElementById("edit-desc").value = descEl.innerText;
}

function saveEdit() {
  titleEl.innerText = document.getElementById("edit-title").value;
  descEl.innerText = document.getElementById("edit-desc").value;

  document.getElementById("edit-form").classList.add("hidden");
}

function cancelEdit() {
  document.getElementById("edit-form").classList.add("hidden");
}

// ---------------- DELETE ----------------
function deleteTask() {
  alert("Task deleted (UI only)");
}

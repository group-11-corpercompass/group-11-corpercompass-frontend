const completedTasks = [
  "Register at NYSC secretariat",
  "Visit PPA on day 1",
  "Collect state code",
  "First CDS attendance",
  "Open local bank account",
  "Attend CDS meeting",
  "Complete community development",
  "Last monthly clearance"
];

const upcomingTasks = [
  "Upload March Clearance",
  "Attend CDS meeting",
  "Submit monthly report"
];

const completedList = document.getElementById("completedTasks");
const upcomingList = document.getElementById("upcomingTasks");
const progressText = document.getElementById("progressText");
const progressCircle = document.querySelector(".progress-circle");

function renderTasks() {
  completedList.innerHTML = "";
  upcomingList.innerHTML = "";

  completedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = "✔ " + task;
    completedList.appendChild(li);
  });

  upcomingTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", () => {
      completedTasks.push(task);
      upcomingTasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + task));
    upcomingList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const total = completedTasks.length + upcomingTasks.length;
  const percent = Math.round((completedTasks.length / total) * 100);

  progressText.textContent = percent + "%";
  progressCircle.style.background = `conic-gradient(green ${percent}%, #ddd 0%)`;
}

document.getElementById("addTask").addEventListener("click", () => {
  const task = prompt("Enter new task:");
  if (task) {
    upcomingTasks.push(task);
    renderTasks();
  }
});

renderTasks();
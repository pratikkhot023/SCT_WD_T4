document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const themeToggle = document.getElementById("themeToggle");

  const priorityColors = {
    High: "#ff3860",
    Medium: "#ff9f43",
    Low: "#1dd1a1",
  };

  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(item => {
      const text = item.querySelector(".task-text").textContent;
      const priority = item.dataset.priority;
      const completed = item.classList.contains("completed");
      tasks.push({ text, priority, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.priority, task.completed, false));
  };

  const addTask = (text, priority, completed = false, shouldSave = true) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.dataset.priority = priority;
    if (completed) taskItem.classList.add("completed");
    taskItem.style.borderLeft = `6px solid ${priorityColors[priority] || "#ccc"}`;

    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = text;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.onclick = () => {
      taskItem.classList.toggle("completed");
      saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      taskItem.remove();
      saveTasks();
    };

    actionsDiv.append(completeBtn, deleteBtn);
    taskItem.append(taskSpan, actionsDiv);
    taskList.appendChild(taskItem);

    if (shouldSave) saveTasks();
  };

  taskForm.addEventListener("submit", e => {
    e.preventDefault();
    addTask(
      document.getElementById("taskInput").value,
      document.getElementById("taskPriority").value
    );
    taskForm.reset();
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  loadTasks();
});

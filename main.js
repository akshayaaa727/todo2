document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        tasks = storedTasks;
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const priorityInput = document.getElementById("priorityInput");

    const text = taskInput.value.trim();
    const deadline = deadlineInput.value.trim();
    const priority = priorityInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false, deadline: deadline, priority: priority });
        taskInput.value = "";
        deadlineInput.value = "";
        priorityInput.value = "low";

        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const priorityInput = document.getElementById("priorityInput");

    taskInput.value = tasks[index].text;
    deadlineInput.value = tasks[index].deadline;
    priorityInput.value = tasks[index].priority;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks}/${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                    <p class="deadline">Deadline: ${task.deadline}</p>
                    <p class="priority">Priority: ${task.priority}</p>
                </div>
                <div class="icons">
                    <img src="edits.png" onClick="editTask(${index})" />
                    <img src="deletes.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

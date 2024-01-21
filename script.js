document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a valid task.');
        return;
    }

    // Create new task element
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskInput.value}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
        <button onclick="toggleCompleted(this)">Toggle</button>
    `;
    taskList.appendChild(li);

    // Save tasks to local storage
    saveTasks();

    // Clear input field
    taskInput.value = '';
}

function editTask(button) {
    const newTask = prompt('Edit task:', button.parentNode.firstChild.textContent);
    if (newTask !== null) {
        button.parentNode.firstChild.textContent = newTask;
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentNode.remove();
    saveTasks();
}

function toggleCompleted(button) {
    const taskSpan = button.parentNode.firstChild;
    taskSpan.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = localStorage.getItem('tasks') || '';
}

// Selectors
const addTaskButton = document.getElementById('add-task-btn');
const taskInputField = document.getElementById('task-input');
const taskListContainer = document.getElementById('task-list');
const taskCounter = document.getElementById('task-count');

let totalTaskCount = 0;

// Function to update task count
function updateTaskCounter() {
    taskCounter.textContent = `Total Tasks: ${totalTaskCount}`;
}

// Function to add a new task
function addNewTask() {
    const taskText = taskInputField.value.trim();
    if (taskText === '') return;

    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    const checkIcon = document.createElement('span');
    checkIcon.classList.add('task-check');
    checkIcon.innerHTML = '&#10003;';
    checkIcon.addEventListener('click', () => {
        if (listItem.classList.toggle('completed')) {
            totalTaskCount--;
        } else {
            totalTaskCount++;
        }
        updateTaskCounter();
    });

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add('task-content');
    taskTextElement.addEventListener('click', () => {
        const newText = prompt('Edit task:', taskTextElement.textContent);
        if (newText) taskTextElement.textContent = newText;
    });

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('task-remove');
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', () => {
        if (!listItem.classList.contains('completed')) {
            totalTaskCount--;
        }
        taskListContainer.removeChild(listItem);
        updateTaskCounter();
    });

    listItem.appendChild(checkIcon);
    listItem.appendChild(taskTextElement);
    listItem.appendChild(deleteButton);
    taskListContainer.appendChild(listItem);
    totalTaskCount++;
    updateTaskCounter();

    taskInputField.value = '';
}

// Event listeners for task input and button
addTaskButton.addEventListener('click', addNewTask);
taskInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewTask();
});

// Initialize task counter
updateTaskCounter();

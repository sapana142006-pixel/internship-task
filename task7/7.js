// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const totalTasksSpan = document.getElementById('totalTasks');

// Function to update the total task count
function updateTaskCount() {
    const count = taskList.children.length;
    totalTasksSpan.textContent = count;
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === '') {
        errorMessage.textContent = 'Please enter a task before adding!';
        return;
    }

    // Clear any previous error message
    errorMessage.textContent = '';

    // Create list item (li)
    const li = document.createElement('li');

    // Create span for the task text
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-text';

    // Toggle completed state when clicking on the task text
    span.addEventListener('click', function () {
        li.classList.toggle('completed');
    });

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    // Remove task when delete button is clicked
    deleteBtn.addEventListener('click', function () {
        li.remove();
        updateTaskCount();
    });

    // Assemble the list item and add to the list
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input field and refocus
    taskInput.value = '';
    taskInput.focus();

    // Update total tasks counter
    updateTaskCount();
}

// Event Listener: Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Event Listener: Add task on pressing "Enter" key (Optional Challenge)
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskText = taskInput.value;

    // Create li element
    const li = document.createElement('li');
    li.innerHTML = `<span>${taskText}</span>
                    <button>Edit</button>
                    <button>Delete</button>`;
    
    // Append li to ul
    taskList.appendChild(li);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Clear input
    taskInput.value = '';
}

function editOrDeleteTask(event) {
    const target = event.target;

    if (target.tagName === 'BUTTON') {
        const li = target.parentNode;
        const taskList = document.getElementById('task-list');

        if (target.innerText === 'Edit') {
            const span = li.querySelector('span');
            const newTaskText = prompt('Edit task:', span.innerText);

            if (newTaskText !== null) {
                span.innerText = newTaskText;
                saveTasksToLocalStorage();
            }
        } else if (target.innerText === 'Delete') {
            taskList.removeChild(li);
            saveTasksToLocalStorage();
        }
    }
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children).map(task => task.querySelector('span').innerText);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${taskText}</span>
                            <button>Edit</button>
                            <button>Delete</button>`;
            taskList.appendChild(li);
        });
    }
}

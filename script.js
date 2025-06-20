const tambahBtn = document.getElementById('sub');
const hapusSemuaBtn = document.getElementById('hapus');
const taskList = document.getElementById('tasklist');
const taskInput = document.getElementById('tulis-list');


document.addEventListener('DOMContentLoaded', loadTasks);


tambahBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const task = taskInput.value.trim();
    if (task === "") {
        alert("Masukkan kegiatannya dulu, Boss!");
        return;
    }

    addTaskToList(task);
    saveTask(task);

    taskInput.value = "";
});


hapusSemuaBtn.addEventListener("click", function () {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});


function addTaskToList(task) {
    const li = document.createElement('li');
    li.textContent = task;

    const hapusbtn = document.createElement("button");
    hapusbtn.textContent = "Hapus";
    hapusbtn.className = "btn btn-sm btn-danger ms-2";

    hapusbtn.addEventListener("click", function () {
        taskList.removeChild(li);
        removeTask(task);
    });

    li.appendChild(hapusbtn);
    taskList.appendChild(li);
}


function saveTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
}

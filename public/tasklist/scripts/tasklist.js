var taskList = [];
function addTaskClicked() {
    let taskNameTextBox = document.getElementById("name");

    let taskName = taskNameTextBox.value;
    taskList.push(taskName);

    addTaskToList(taskName);

    saveTaskList();

    taskNameTextBox.value = "";
}

function clearTaskListClicked() {
    let selectElement = document.getElementById('task-list');
    let L = selectElement.options.length - 1;
    for (let i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
    taskList = [];

    saveTaskList();
}

function loadTasks() {
    taskList = JSON.parse(localStorage.getItem("taskList"));
    for (let i = 0; i < taskList.length; i++) {
        addTaskToList(taskList[i])
    }
}

function saveTaskList() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}
function addTaskToList(taskName) {
    var x = document.getElementById('task-list');
    var option = document.createElement("option");
    option.text = taskName;
    option.value = taskName;
    x.add(option);
}
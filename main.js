let taskInput = document.getElementById("task-input");
let plusBtn = document.getElementById("plus-btn");
let taskList = [];
let tabs = document.querySelectorAll(".task-taps div");
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

plusBtn.addEventListener("click", addList);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("plus-btn").click();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  tabs.forEach((menu) => menu.addEventListener("click", (e) => indicator(e)));
}
function indicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function addList() {
  let taskValue = taskInput.value;
  if (taskValue === "") return alert("write your to-do");
  let task = {
    id: generateID(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="tasks">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggle('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
    } else {
      resultHTML += `<div class="tasks">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggle('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggle(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
  console.log(taskList);
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("ongoing", filterList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function generateID() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}

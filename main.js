// VARIABLES--------------------------------------------

let newToDoBtn = document.getElementById("newToDo_btn");
let formCancelBtn = document.getElementById("formCancelBtn");
let popup = document.querySelector(".popup");
let popupChange = document.querySelector(".popupChange");
let formSaveChangeBtn = document.getElementById("formSaveChangeBtn");
let formCancelChangeBtn = document.getElementById("formCancelChangeBtn");
let nameAlert = document.getElementsByClassName("nameRequired")[0];
let content = document.getElementsByClassName("tabs-content")[0];
let todosCurrent = document.getElementsByClassName("toDo-list-current")[0];
let todosCompleted = document.getElementsByClassName("toDo-list-completed")[0];
let todosRemote = document.getElementsByClassName("toDo-list-remote")[0];
let saveToDoBtn = document.getElementById("saveToDo_btn");

// LISTENERS------------------------------------------------------------------

window.onload = tab();
newToDoBtn.onclick = function () {
  popup.style.display = "block";
};
// --------------------------------------------------------------------------
formCancelBtn.onclick = function () {
  popup.style.display = "none";
  nameAlert.style.display = "none";
  formReset();
};
// ------------------------------------------------------------------------------
formAddBtn.onclick = addTodoItem;
formCancelChangeBtn.onclick = function () {
  popupChange.style.display = "none";
  document.getElementsByClassName("nameRequiredChange")[0].style.display =
    "none";
};
// ------------------------------------------------------------------------------------
saveToDoBtn.onclick = localLoad;

document.addEventListener("DOMContentLoaded", localUpload());
// ----------------------------------------------------------------------------------------
content.addEventListener("click", function (event) {
  let target = event.target;
  if (target.classList.contains("fa-trash-alt")) {
    let ul = document.getElementsByClassName("toDo-list-remote")[0];
    let li = target.parentElement.parentElement;
    ul.append(li);
    li.getElementsByClassName("fa-cash-register")[0].style.display = "none";
    li.getElementsByClassName("fa-check-square")[0].style.display = "none";
    li.getElementsByClassName("fa-trash-alt")[0].style.display = "none";
    li.getElementsByClassName("fa-trash-restore")[0].style.display = "inline";
  }
  if (target.classList.contains("fa-check-square")) {
    let ul = document.getElementsByClassName("toDo-list-completed")[0];
    let li = target.parentElement.parentElement;
    ul.append(li);
    li.getElementsByClassName("fa-cash-register")[0].style.display = "inline";
    li.getElementsByClassName("fa-check-square")[0].style.display = "none";
    li.getElementsByClassName("fa-trash-alt")[0].style.display = "inline";
    li.getElementsByClassName("fa-trash-restore")[0].style.display = "none";
  }
  if (target.classList.contains("fa-trash-restore")) {
    let ul = document.getElementsByClassName("toDo-list-current")[0];
    let li = target.parentElement.parentElement;
    ul.append(li);
    li.getElementsByClassName("fa-cash-register")[0].style.display = "inline";
    li.getElementsByClassName("fa-check-square")[0].style.display = "inline";
    li.getElementsByClassName("fa-trash-alt")[0].style.display = "inline";
    li.getElementsByClassName("fa-trash-restore")[0].style.display = "none";
  }
  if (target.classList.contains("fa-cash-register")) {
    let li = target.parentElement.parentElement;

    document.getElementsByName(
      "taskNameChange"
    )[0].value = li.getElementsByClassName("toDo-name")[0].innerHTML;
    document.getElementsByName(
      "taskDescriptionChange"
    )[0].value = li.getElementsByClassName("toDo-description")[0].innerHTML;
    popupChange.style.display = "block";
    saveChange(li);
  }
});

// FUNCTIONS-------------------------------------------------------------------------

function tab() {
  let tabNav = document.querySelectorAll(".tabs-nav_item");
  let tabContent = document.querySelectorAll(".tab");
  let tabName;

  tabNav.forEach(function (item) {
    item.addEventListener("click", selectTabNav);
  });

  function selectTabNav() {
    tabNav.forEach(function (item) {
      item.classList.remove("active-nav");
    });
    this.classList.add("active-nav");
    tabName = this.getAttribute("tab-name");
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach(function (item) {
      if (item.classList.contains(tabName)) {
        item.classList.add("active-content");
      } else {
        item.classList.remove("active-content");
      }
    });
  }
}

// ---------------------------------------------------------------------------------------------
function saveChange(item) {
  formSaveChangeBtn.onclick = function () {
    if (document.getElementsByName("taskNameChange")[0].value !== "") {
      item.getElementsByClassName(
        "toDo-name"
      )[0].innerHTML = document.getElementsByName("taskNameChange")[0].value;
      item.getElementsByClassName(
        "toDo-description"
      )[0].innerHTML = document.getElementsByName(
        "taskDescriptionChange"
      )[0].value;
      let radiochange = document.getElementsByName("priorityChange");

      for (let i = 0; i < radiochange.length; i++) {
        if (radiochange[i].checked) {
          priorityChange = radiochange[i].value;
        }
      }
      item.getElementsByClassName(
        "toDo-priority"
      )[0].innerHTML = priorityChange;
      popupChange.style.display = "none";
      document.getElementsByClassName("nameRequiredChange")[0].style.display =
        "none";
    } else {
      document.getElementsByClassName("nameRequiredChange")[0].style.display =
        "inline";
    }
  };
}

// --------------------------------------------------------------------------------------------

function addTodoItem() {
  let name = document.getElementsByName("taskName")[0].value;
  let description = document.getElementsByName("taskDescription")[0].value;
  let priority;
  let radio = document.getElementsByName("priority");

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      priority = radio[i].value;
    }
  }
  if (name !== "") {
    let item = document.createElement("li");
    item.innerHTML = `<span class="toDo-name">${name}</span>
    <span class="toDo-description">
    ${description}
    </span>
    <span class="toDo-priority">${priority}</span>
    <span class="toDo-tools">
    <i class="fas fa-cash-register"></i>
    <i class="fas fa-check-square"></i>
    <i class="fas fa-trash-alt"></i>
    <i class="fas fa-trash-restore"></i>
    </span>`;
    let ul = document.querySelector(".toDo-list-current");
    ul.append(item);
    item.getElementsByClassName("fa-cash-register")[0].style.display = "inline";
    item.getElementsByClassName("fa-check-square")[0].style.display = "inline";
    item.getElementsByClassName("fa-trash-alt")[0].style.display = "inline";
    item.getElementsByClassName("fa-trash-restore")[0].style.display = "none";

    popup.style.display = "none";
    nameAlert.style.display = "none";
    formReset();
    // toDoTools();
  } else {
    nameAlert.style.display = "inline";
  }
}

// ------------------------------------------------------------------------------------

function formReset() {
  let taskName = document.getElementById("taskName");
  let taskDescription = document.getElementById("taskDescription");
  let radio = document.getElementsByName("priority");

  taskName.value = "";
  taskDescription.value = "";
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radio[i].checked = false;
      radio[0].checked = true;
    }
  }
}

// ---------------------------------------------------------------------

function localLoad() {
  localStorage.setItem("current", todosCurrent.innerHTML);
  localStorage.setItem("completed", todosCompleted.innerHTML);
  localStorage.setItem("remote", todosRemote.innerHTML);
}

// ----------------------------------------------------------------------------

function localUpload() {
  let dataCurrent = localStorage.getItem("current");
  let dataCompleted = localStorage.getItem("completed");
  let dataRemote = localStorage.getItem("remote");
  if (dataCurrent) {
    todosCurrent.innerHTML = dataCurrent;
  }
  if (dataCompleted) {
    todosCompleted.innerHTML = dataCompleted;
  }
  if (dataRemote) {
    todosRemote.innerHTML = dataRemote;
  }
}

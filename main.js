window.onload = tab();

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

// ----------------------------------------------------------------

let newToDoBtn = document.getElementById("newToDo_btn");
let formCancelBtn = document.getElementById("formCancelBtn");
let popup = document.querySelector(".popup");
let popupChange = document.getElementsByClassName("popupChange")[0];
let formSaveChangeBtn = document.getElementById("formSaveChangeBtn");
let formCancelChangeBtn = document.getElementById("formCancelChangeBtn");
let nameAlert = document.getElementsByClassName("nameRequired")[0];

newToDoBtn.onclick = function () {
  popup.style.display = "block";
};
formCancelBtn.onclick = function () {
  popup.style.display = "none";
  nameAlert.style.display = "none";
  formReset();
};
formAddBtn.onclick = addTodoItem;
formCancelChangeBtn.onclick = function () {
  popupChange.style.display = "none";
  document.getElementsByClassName("nameRequiredChange")[0].style.display =
    "none";
};

// ---------------------------------------------------------------------------------------

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

    item.lastElementChild
      .querySelector(".fa-trash-alt")
      .addEventListener("click", function () {
        let ul = document.querySelector(".toDo-list-remote");
        ul.append(item);
        item.getElementsByClassName("fa-cash-register")[0].style.display =
          "none";
        item.getElementsByClassName("fa-check-square")[0].style.display =
          "none";
        item.getElementsByClassName("fa-trash-alt")[0].style.display = "none";
        item.getElementsByClassName("fa-trash-restore")[0].style.display =
          "inline";
      });

    item.lastElementChild
      .querySelector(".fa-check-square")
      .addEventListener("click", function () {
        let ul = document.querySelector(".toDo-list-completed");
        ul.append(item);
        item.getElementsByClassName("fa-cash-register")[0].style.display =
          "inline";
        item.getElementsByClassName("fa-check-square")[0].style.display =
          "none";
        item.getElementsByClassName("fa-trash-alt")[0].style.display = "inline";
        item.getElementsByClassName("fa-trash-restore")[0].style.display =
          "none";
      });

    item.lastElementChild
      .querySelector(".fa-trash-restore")
      .addEventListener("click", function () {
        let ul = document.querySelector(".toDo-list-current");
        ul.append(item);
        item.getElementsByClassName("fa-cash-register")[0].style.display =
          "inline";
        item.getElementsByClassName("fa-check-square")[0].style.display =
          "inline";
        item.getElementsByClassName("fa-trash-alt")[0].style.display = "inline";
        item.getElementsByClassName("fa-trash-restore")[0].style.display =
          "none";
      });

    item.lastElementChild
      .querySelector(".fa-cash-register")
      .addEventListener("click", function () {
        document.getElementsByName(
          "taskNameChange"
        )[0].value = item.getElementsByClassName("toDo-name")[0].innerHTML;
        document.getElementsByName(
          "taskDescriptionChange"
        )[0].value = item.getElementsByClassName(
          "toDo-description"
        )[0].innerHTML;

        popupChange.style.display = "block";
      });

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

    popup.style.display = "none";
    nameAlert.style.display = "none";
    formReset();
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

let todosCurrent = document.getElementsByClassName("toDo-list-current")[0];
let todosCompleted = document.getElementsByClassName("toDo-list-completed")[0];
let todosRemote = document.getElementsByClassName("toDo-list-remote")[0];
let saveToDoBtn = document.getElementById("saveToDo_btn");

saveToDoBtn.onclick = function () {
  localStorage.setItem("current", todosCurrent.innerHTML);
  localStorage.setItem("completed", todosCompleted.innerHTML);
  localStorage.setItem("remote", todosRemote.innerHTML);
};

document.addEventListener("DOMContentLoaded", function () {
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
});

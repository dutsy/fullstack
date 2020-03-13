let alertBox = (function() {
  //this function hides the alert box if it is already on
  function hide() {
    if (!document.getElementById("alert_box").classList.contains("d-none")) {
      document.getElementById("alert_box").classList.add("d-none");
    }
  }

  //this function shows alert box
  function show(str) {
    document.getElementById("alert_box").innerHTML = str;
    document.getElementById("alert_box").classList.remove("d-none");
  }

  return {
    hide: hide,
    show: show
  };
})();
let storage = (function() {
  //check if inserted
  function getStorage() {
    if (!checkStorage()) {
      let temp = [];
      let item = JSON.parse(localStorage.getItem("todoList"));
      for (const it of item) {
        let qussay = new Todo(it.description, it.todoDate, it.todoTime);
        temp.push(qussay);
      }
      return temp;
    }
  }
  function clearStorage() {
    localStorage.clear();
  }
  function checkStorage() {
    return localStorage.getItem("todoList") === null;
  }

  function updateStorage(list) {
    let temp = []; //contains all the completed todos.
    for (const item of list) {
      if (!item.isCompleted()) {
        temp.push(item);
      }
    }
    localStorage.setItem("todoList", JSON.stringify(temp));
  }

  return {
    getStorage: getStorage,
    checkStorage: checkStorage,
    updateStorage: updateStorage,
    clearStorage: clearStorage
  };
})();

//to-do object class
class Todo {
  constructor(description, date, time) {
    this.description = description;
    this.completed = false;
    this.todoDate = date;
    this.todoTime = time;
  }

  isCompleted() {
    return this.completed;
  }
  setCompleted() {
    this.completed = true;
  }
  getDescription() {
    return this.description;
  }
  getTodoDate() {
    return this.todoDate;
  }
  getTodoTime() {
    return this.todoTime;
  }
}

let list = (function() {
  let todo_list = []; //contains all the todos, completed and non-completed
  if (!storage.checkStorage()) {
    todo_list = storage.getStorage();
    addhistory();
  }

  function validate(todo_desc, dated) {
    //checks if it is empty to-do or not
    function isEmpty(desc) {
      return desc.trim() == "" || desc == null;
    }

    function isNDated(dated) {
      return !dated;
    }

    //checks if this to-do already in list and not completed
    function alreadyExists(desc) {
      for (const item of todo_list) {
        if (!item.isCompleted() && item.getDescription() == desc) {
          return true;
        }
      }
      return false;
    }

    if (isEmpty(todo_desc)) {
      alertBox.show("Please enter non-empty TODO");
      return false;
    } else if (alreadyExists(todo_desc)) {
      alertBox.show("This todo already exists!");
      return false;
    } else if (isNDated(dated)) {
      alertBox.show("please enter non-empty TODO date");
      return false;
    }

    return true;
  }

  function addItemToList(item) {
    //create a complete button for non-completed todos
    function createButton() {
      let new_button = document.createElement("button");
      new_button.classList.add("btn", "btn-success", "btn-sm", "float-right");
      new_button.innerHTML = "&#10060;";
      return new_button;
    }

    //create html list item
    function createListItem() {
      let new_item = document.createElement("li");
      //new_item.classList.add('list-group-item', 'list-group-item-primary');
      return new_item;
    }

    let new_item = createListItem();
    new_item.appendChild(document.createTextNode(item.getDescription())); //adds to-do description to html
    new_item.appendChild(document.createElement("br"));//to get break line after text node 
    new_item.appendChild(document.createTextNode(item.getTodoDate())); //adds to-do date to html
    new_item.appendChild(document.createElement("br"));//to get break line after text node
    new_item.appendChild(document.createTextNode(item.getTodoTime())); //adds to-do time to html

    //if to-do is not completed then creates and adds a complete button in html
    if (!item.isCompleted()) {
      let new_button = createButton();
      new_button.addEventListener("click", complete);
      new_item.appendChild(new_button);
    } else {
      new_item.classList.add("list-group-item-success");
    }

    document.getElementById("todo_list").appendChild(new_item);
  }

  //adds new to-do to the list
  function addTodo() {
    let description = document.getElementById("todo").value;
    let controlDate = document.getElementById("todoDate").value;
    let controlTime = document.getElementById("todoTime").value;
    if (!validate(description, controlDate)) {
      return;
    }

    alertBox.hide();

    let todo = new Todo(description, controlDate, controlTime);
    addItemToList(todo);
    todo_list.push(todo);
    storage.updateStorage(todo_list);
  }

  //switch between the completed and non-completed lists
  function switchList() {
    alertBox.hide();
    storage.updateStorage(todo_list);
    document.getElementById("todo_list").innerHTML = "";

    //add to html only completed todos
    if (
      document.getElementById("switch_list_btn").innerHTML == "Show completed"
    ) {
      for (const item of todo_list) {
        if (item.isCompleted()) {
          addItemToList(item);
        }
      }
      document.getElementById("switch_list_btn").innerHTML = "Show todo";
      document
        .getElementById("switch_list_btn")
        .classList.remove("btn-success");
      document.getElementById("switch_list_btn").classList.add("btn-secondary");
      document.getElementById("input_block").classList.add("d-none");
    }
    //add to html only non-completed todos
    else {
      for (const item of todo_list) {
        if (!item.isCompleted()) {
          addItemToList(item);
        }
      }
      document.getElementById("switch_list_btn").innerHTML = "Show completed";
      document
        .getElementById("switch_list_btn")
        .classList.remove("btn-secondary");
      document.getElementById("switch_list_btn").classList.add("btn-success");
      document.getElementById("input_block").classList.remove("d-none");
    }
  }

  function complete() {
    this.removeEventListener("click", complete); //removes the listener of the button

    //searches for the to-do to set it as completed
    for (const item of todo_list) {
      if (item.getDescription() == this.parentElement.firstChild.nodeValue) {
        item.setCompleted();
      }
    }
    document.getElementById("todo_list").removeChild(this.parentElement);
    storage.updateStorage(todo_list);
  }

  function addhistory() {
    temp = storage.getStorage();
    for (const play of temp) {
      addItemToList(play);
    }
  }

  return {
    addTodo: addTodo,
    switchList: switchList
  };
})();

// wait for the DOM to be loaded before accessing element to add listeners!
document.addEventListener(
  "DOMContentLoaded",
  function() {
    //add listener for the new to-do button
    document
      .getElementById("add_button")
      .addEventListener("click", list.addTodo);

    //add a listener for the switching lists button
    document
      .getElementById("switch_list_btn")
      .addEventListener("click", list.switchList);

    //add a listener to keyboard presses so we hide the alert if it is on
    document.addEventListener("keypress", alertBox.hide);
    document
      .getElementById("clearStorage")
      .addEventListener("click", storage.clearStorage);
  },
  false
);

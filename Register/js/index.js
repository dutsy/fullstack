//https://getbootstrap.com/docs/4.4/components/forms/
let currentID = 0;
let Users = []


function nextUserId() {
  currentID++;
  return currentID;
}

window.onload = () => {
  document.querySelector('#save').addEventListener('click', SaveUser);
  document.querySelector('#list').addEventListener('click', ListUsers);
  document.querySelector('#cards').addEventListener('click', CardUsers);
  document.querySelector('#clear').addEventListener('click', ClearPanel);
}

function SaveUser() {
  let id = nextUserId();
  let username = document.querySelector("#userName")
  let email = document.querySelector("#email")
  let password = document.querySelector("#password")

  let user = new User(id, username.value, email.value, password.value)
  if (user.validate()) {
    Users.push(user);
    username.value = "";
    email.value = "";
    password.value = "";
    username.focus();
  } else {
    if (user.error) {
      let spanError = document.querySelector("#error");
      spanError.innerText = user.error.errorMessage;
      spanError.hidden = false;
      setTimeout(() => {
        spanError.hidden = true;
        spanError.innerText = error.errorMessage
      }, 2000)
    }
  }
}


function ListUsers() {
  let buffer = "<table border='1' class='table table-dark'>"
  buffer += (Users.map((user) =>
                  `<tr>
                       <td>${user.userid}</td>
                       <td>${user.username}</td>
                       <td>${user.email}</td>
                       <td>${user.password}</td>
                   </tr>`)).join("");
  buffer += "</table>"

  document.querySelector("#panel").innerHTML = buffer;
}

function ClearPanel() {
  document.querySelector("#panel").innerHTML = "";
}

function CardUsers() {
  let buffer = `<div class="card-columns">`

  for (let i = 0; i < Users.length; i++) {
    let user = Users[i];
    buffer += user.card();
  }
  buffer += "</div>"
  document.querySelector("#panel").innerHTML = buffer;
}

// let cardBuffer = `<div class="card w-35 text-white bg-dark  border-primary">
//                      <div class="card-body">
//                           <h5 class="card-title">User: ${user.userid}</h5>
//                           <p class="card-text">Name: ${user.username}</p>
//                           <p class="card-text">Email: ${user.email}</p>
//                           <p class="card-text">Password: ${user.password}</p>
//                      </div>
//                      <div class="card-footer">
//                          <small class="text-muted">Last updated 3 mins ago</small>
//                      </div>
//                   </div>`

// <div class="card-group">
//   <div class="card">
//     <img src="..." class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">Card title</h5>
//       <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     </div>
//     <div class="card-footer">
//       <small class="text-muted">Last updated 3 mins ago</small>
//     </div>
//   </div>
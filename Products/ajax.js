


window.onload = function() {
    document.querySelector("#addnew").addEventListener( 'click' ,AddNewProduct )
    document.querySelector("#delete").addEventListener( 'click' ,DeleteProduct )    
    document.querySelector("#update").addEventListener( 'click' ,UpdateProduct )        
    document.querySelector("#show").addEventListener( 'click' , ShowPicture )    
}

function ShowPicture() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob"

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            document.querySelector("#mypic").width = "300"
            document.querySelector("#mypic").src = URL.createObjectURL(xhr.response)
      }
    });
    xhr.open("GET", "view.jpg");
    xhr.send();
}

function DeleteProduct() {
    let pid = document.querySelector("#pid").value;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("DELETE", "http://localhost:3000/products/" + pid);
    xhr.send();
}

function UpdateProduct() {
    let pid = document.querySelector("#pid").value;
    let pname = document.querySelector("#pname").value;
    let price = document.querySelector("#price").value;
    let stock = document.querySelector("#stock").value;
    let data = `{ "pname" :  "${pname}" , "price": ${price} , "stock" : ${stock}}`

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("PUT", "http://localhost:3000/products/" + pid);
    xhr.setRequestHeader("Content-Type", "application/json");    
    xhr.send(data);
}

function AddNewProduct() {
    let pname = document.querySelector("#pname").value;
    let price = document.querySelector("#price").value;
    let stock = document.querySelector("#stock").value;
    let data = `{ "pname" :  "${pname}" , "price": ${price} , "stock" : ${stock}}`
    
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", "http://localhost:3000/products");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(data);
}



// user class
function User(currentID, username, email, password) {
    this.userid = currentID;
    this.username = username;
    this.email = email;
    this.password = password;
    this.errors = [];
}

User.prototype.validate = function () {
    if (this.username === "") {
        this.error  = {
            field: 'username',
            errorMessage: 'Please fill username'
        }
        return false;
    }

    if (this.email === "") {
        this.error = {
            field: 'email',
            errorMessage: 'Please fill email'
        }
        return false;
    }

    if (this.password === "") {
        this.error = {
            field: 'password',
            errorMessage: 'Please fill password'
        }
        return false;
    }
    
    // valid
    return true;
}

User.prototype.card = function () {
    return `<div class="card w-35 text-white bg-dark  border-primary">
                <div class="card-body">
                    <h5 class="card-title">User: ${this.userid}</h5>
                    <p class="card-text">Name: ${this.username}</p>
                    <p class="card-text">Email: ${this.email}</p>
                    <p class="card-text">Password: ${this.password}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>`
}


User.prototype.show = function () {
    return `(user ID: ${this.userid}) name: ${this.username} password: ${this.password}`
}
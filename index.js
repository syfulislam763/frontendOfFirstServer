const usersDiv = document.getElementById("users");
const form  = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const emailField = document.getElementById('email');
const selectOption = document.getElementById('selectOption');




class Users {
    constructor(newUser){
        this.newUser = newUser || {first_name:"",last_name:"", email:"", gender:""};
    }

    handleChange = e => {
        this.newUser[e.target.name] = e.target.value;
    }

    
    handleFormSubmit = (e, url) => {
        //e.preventDefault();
        //https://secure-sea-04829.herokuapp.com/users
        let newUser = JSON.stringify(this.newUser)
        console.log(newUser);
        this._createNewUser(url, newUser)
        

        //this.fetchAllUser("https://secure-sea-04829.herokuapp.com/users");
        this.newUser = {name:"", email:"", gender:""};
        e.target.reset();
    }

    fetchUser = url => {
        fetch(url)
            .then(res => res.json())
            .then(user => console.log(user))
            .catch(e => console.log(e.message))
    }


    fetchAllUser = url => {
        fetch(url)
            .then(res => res.json())
            .then(users => this._displayUser(users))
            .catch(e => {
                console.log(e.message);
            })
    }

    _createNewUser = (url, newUser) => {
        fetch(url, {
            method: "POST",
            body: newUser,
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(message => {
            console.log(message);
            // fetch(url)
            //     .then(res => res.json())
            //     .then(msg => console.log("message", msg))
            //     .catch(e => console.log(e))
        })
        .catch(e => console.log(e.message))
    }


    _displayUser = users => {
        usersDiv.innerHTML = '';
        users.forEach(user => {
            usersDiv.innerHTML += `<div class="user">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p><strong>${user.email}</strong></p>
            <p><strong>${user.gender}</strong></p>
            <button onclick="users.deleteUser(${user.id})">Delete</button>
        </div>`
        })
    }

    deleteUser = id => {
        fetch("https://secure-sea-04829.herokuapp.com/deleteUser/"+id, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log(e.message))
        
        window.location.reload();
    }
}


const users = new Users({first_name:"",last_name:"", email:"", gender:""});






users.fetchAllUser("https://secure-sea-04829.herokuapp.com/users");
users.fetchUser("https://secure-sea-04829.herokuapp.com/user/1");


form.addEventListener("submit", (e) => users.handleFormSubmit(e, "https://secure-sea-04829.herokuapp.com/addUser"));
firstName.addEventListener("keyup", (e) => users.handleChange(e));
lastName.addEventListener("keyup", (e) => users.handleChange(e))
emailField.addEventListener("keyup", (e) => users.handleChange(e));
selectOption.addEventListener("change", (e) => users.handleChange(e));






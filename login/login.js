let app = new Vue ({
    el: '#app',
    data: {
        loggedin: false,
        loginUser: "",
        loginPass: "",
        createUser: "",
        createPass: "",
        devURL: "http://localhost:3000",
        prodURL: null,
        user: null,
        username: null,
        token: null,
    },
    methods: {
        handleLogin: function(event) {
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.loginUser, password: this.loginPass}
            fetch(`${URL}/login`, {
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then((data) => {
                this.username = (data.user.username)
                this.user = (data.user.id)
                this.token = data.token
                this.loggedin = true
                this.loginUser = ""
                this.loginPass = ""
            })
            .then(()=> {
                //pass variables to homepage
                //store variables in local storage
                localStorage.setItem("vUsername", this.username);
                localStorage.setItem("vUser", this.user);
                localStorage.setItem("vToken", this.token);
                localStorage.setItem("vLoggedIn", this.loggedin);
                
                //reset variables
                this.loggedin = false;
                this.token = null;
                this.user = null;
                this.username = null;

                // Simulate a mouse click: redirecting to index.html
                window.location.href = "./index.html";
            })

        },
        handleCreate: function(event) {
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.createUser, password: this.createPass}
            fetch(`${URL}/users`, {
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json)
            .then((data) => {
                if (data.error) {
                    alert('Creation Unsuccessful')
                } else {
                    alert('Creation Successful! Please log in.')
                }
                this.createUser = ""
                this.createPass = ""
            })
        },
    }
})

function redirectAfterLogin() {
    //TODO: extract logic for redirect to here to reuse in both methods

}


let app = new Vue ({
    el: '#app',
    data: {
        registered: true,
        loginUser: "",
        loginPass: "",
        createUser: "",
        createPass: "",
        devURL: "https://ga-project-three.herokuapp.com",
        prodURL: null,
        user: null,
        username: null,
        token: null,
        usernamewarning: false,
        passwordwarning: false,
        invalidfields: false,
        successfields: false
    },
    methods: {
        handleLogin: function(event) {
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.loginUser, password: this.loginPass}
            if (this.loginUser === "") {
                this.usernamewarning = true
                this.passwordwarning = false
                this.invalidfields = false
            } else if (this.loginPass === "") {
                this.passwordwarning = true
                this.usernamewarning = false
                this.invalidfields = false
            } else {
                fetch(`${URL}/login`, {
                    method: "post",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(user)
                })
                .then((response) => response.json())
                .then((data) => {
                if (data.error) {
                    this.invalidfields = true
                    this.usernamewarning = false
                    this.passwordwarning = false
                } else {
                    this.username = (data.user.username)
                    this.user = (data.user.id)
                    this.token = data.token
                    this.loggedin = true
                    this.loginUser = ""
                    this.loginPass = ""
                    this.invalidfields = false
                    }
                })
                .then(()=> {
                    if(this.invalidfields == false) {
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
                        window.location.href = "./homepage.html";
                    }
                })
            }
        },
        handleCreate: function(event) {
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.createUser, password: this.createPass}
            if (this.createUser === "") {
                this.usernamewarning = true
                this.passwordwarning = false
                this.invalidfields = false
            } else if (this.createPass === "") {
                this.passwordwarning = true
                this.usernamewarning = false
                this.invalidfields = false
            } else {
                fetch(`${URL}/users`, {
                    method: "post",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(user)
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        this.invalidfields = true
                        this.usernamewarning = false
                        this.passwordwarning = false
                    } else {
                        this.invalidfields = false
                        this.successfields = true
                        this.usernamewarning = false
                        this.passwordwarning = false
                    }
                    this.createUser = ""
                    this.createPass = ""
                })
            }
        },
    }
}

// function redirectAfterLogin() {
//     //TODO: extract logic for redirect to here to reuse in both methods

// }
)
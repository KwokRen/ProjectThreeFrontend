let app = new Vue ({
    el: '#app',
    data: {
        loggedin: false,
        displayvideo: false,
        JWT: "",
        loginUser: "",
        loginPass: "",
        createUser: "",
        createPass: "",
        devURL: "http://localhost:3000",
        prodURL: null,
        user: null,
        username: null,
        token: null,
        redbg: false,
        greenbg: false,
        displaycomment: false,
        displaycomments: false,
        comments: [],
        videos: [],
        videoSource: null,
        newComment: "",
        updateComment: "",
        updateDivComment: "",
        openEditDiv: 0,
        openDeleteDiv: 0
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
                // Simulate a mouse click: redirecting to index.html
                window.location.href = "./index.html";
            })

        },
        handleLogout: function(event) {
            this.loggedin = false
            this.user = null
            this.token = null
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
        displayVideo: function(event) {
            this.displayvideo = true
            this.showVideo(event.target.parentNode.id)
            this.getComments()
        },
        displayHomepage: function(event) {
            this.displayvideo = false
        },
        getComments: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            fetch(`${URL}/videos/1/comments`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.comments = data.data
            })
        },
        createComment: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const textOfComment = {content: this.newComment}
            fetch(`${URL}/videos/1/users/${this.user}/comments`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(textOfComment)
            })
            .then((response) => response.json())
            .then((data) => {
                this.newComment = ""
                this.getComments()
            })
        },
        updateAComment: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const textOfComment = {content: this.updateComment}
            const id = event.target.id
            fetch(`${URL}/videos/1/users/${this.user}/comments/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(textOfComment)
            })
            .then((response) => response.json())
            .then((data) => {
                this.updateComment = ""
                this.getComments()
                this.openEditDiv = 0
            })
        },
        deleteAComment: function(event) {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const id = event.target.id
            fetch(`${URL}/videos/1/users/${this.user}/comments/${id}`, {
            method: "delete",
            headers: {
                Authorization: `bearer ${this.token}`
            }
        })
            .then((response) => {
                this.getComments()
            })
        },
        getVideos: function() {
            fetch(`${this.devURL}/videos`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.videos = data.response
            })
        },
        showVideo: function(id) {
            fetch(`${this.devURL}/videos/${id}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.videoSource = "https://youtube.com/embed/" + data.data.videoID 
            }) 
        }
    },
    beforeMount() {
        console.log('runs')
        this.getVideos()
    }
})

function redirectAfterLogin() {
    //TODO: extract logic for redirect to here to reuse in both methods

}
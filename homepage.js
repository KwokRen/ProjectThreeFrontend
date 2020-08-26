//TODO: remove code if not being used
// $('.hamburgerdiv').on('click', () => {
//     $('.hamburgerdiv').toggleClass('open')
//     $('.hidden').toggleClass('show')
// })

let app = new Vue ({
    el: '#app',
    data: {
        loggedin: false,
        displayvideo: false,
        JWT: "",
        user: "",
        username: "",
        token:"",
        redbg: false,
        greenbg: false,
        displaycomment: false,
        displaycomments: false,
        comments: [],
        devURL: "http://localhost:3000",
        prodURL: null,
        videos: [],
        videoSource: null,
        newComment: "",
        updateComment: "",
        updateDivComment: "",
        openEditDiv: 0,
        openDeleteDiv: 0,
        correctUser: 0
    },
    methods: {
        handleLogout: function(event) {
            console.log("clicked handleLogout")
            this.loggedin = false
            this.user = null
            this.token = null
            //After logout, page is refreshed via href
        },
        displayVideo: function(event) {
            this.displayvideo = true
            this.showVideo(event.target.parentNode.id)
            this.getComments()
        },
        displayHomepage: function(event) {
            this.displayvideo = false
        },
        signUpToComment: function(event) {
            alert("You must be logged in to comment")
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
                this.comments = data
            })
        },
        createComment: function() {
            if(this.loggedin) {
                const URL = this.prodURL ? this.prodURL : this.devURL;
                const textOfComment = {content: this.newComment}
                if (this.newComment === "") {
                    alert("You must have text.")
                } else {
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
                }
            } else {
                alert("You must be logged in to comment.")
            }
        },
        updateAComment: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const textOfComment = {content: this.updateComment}
            const id = event.target.id
            if (this.updateComment === "") {
                alert("You must have text.")
            } else {
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
            }
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
        thumbsUp: function(event) {
            //logic for thumbs up
            console.log("thumbs Up clicked")
            if(this.hasUpVoted){
                //logic to remove one to upvote on video
                //has upvoted to false
                this.hasUpVoted = false;
            }else {
                //logic to add one upvote on video
                //hasupvoted to true
                this.hasUpVoted = true;
                //if downvote is true, set to false, and remove one downvote
            }
            console.log(this.hasUpVoted)

        },
        thumbsDown: function(event) {
            //logic for thumbs down
            console.log("thumbs Down clicked")
            if(this.hasDownVoted){
                //logic to remove one to downvote on video
                //has downvoted to false
            }else {
                //logic to add one downvote on video
                //hasdownvoted to true
                //if upvote is true, set to false, and remove one upvote
            }
        },
        getVideos: function() {
            fetch(`${this.devURL}/videos`)
            .then((response) => response.json())
            .then((data) => {
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
        },
    },
    beforeMount(){
        this.getVideos()

        const checkIfLoggedIn = ()=> {
            let isLoggedIn = localStorage.getItem("vLoggedIn");
            //convert string to boolean
            if (isLoggedIn == "true") {
                //set variables that are passed in from local storage
                this.username = localStorage.getItem("vUsername");
                this.user = Number(localStorage.getItem("vUser"));
                this.correctUser = Number(localStorage.getItem("vUser"));
                this.token = localStorage.getItem("vToken");
                localStorage.clear();
                return true;
            } else { // returned null, or undefined because login file has not run yet
                return false;
            }
        }
        this.loggedin = checkIfLoggedIn();
        //TODO: remove log before commiting to master
        console.log("vloggedIn", this.loggedin);
        
    }
})

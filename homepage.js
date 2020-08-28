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
        video_Id: null,
        video_title: null,
        video_likes: 0,
        video_dislikes: 0,
        is_liked: null,
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
            //TODO: might be best to remove this line for master, see comments on line 164
            //removes login data from local storage
            localStorage.clear();
            //After logout, page is refreshed via href
        },
        displayVideo: function(event) {
            this.displayvideo = true
            this.video_Id = event.target.parentNode.id
            this.showVideo(this.video_Id)
            this.getVideoStats(this.video_Id)
            this.getComments()
            console.log(this.user, this.video_Id)
            console.log('user vote', this.showUserVote())
        },
        displayHomepage: function(event) {
            this.displayvideo = false
        },
        signUpToComment: function(event) {
            alert("You must be logged in to comment")
        },
        getComments: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            fetch(`${URL}/videos/${this.video_Id}/comments`, {
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
        updateVideoLikes: function() {
            // update like_count and dislike_count on Videos table
            // Used to update thumbnail video stats
            const updated_stats = {"like_count": this.video_likes, "dislike_count": this.video_dislike}
            fetch(`${this.devURL}/videos/${this.video_Id}`, {
                method: "put",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updated_stats)

            })
            .then( res => res.json())
        },
        createComment: function() {
            if(this.loggedin) {
                const URL = this.prodURL ? this.prodURL : this.devURL;
                const textOfComment = {content: this.newComment}
                if (this.newComment === "") {
                    alert("You must have text.")
                } else {
                    fetch(`${URL}/videos/${this.video_Id}/users/${this.user}/comments`, {
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
                fetch(`${URL}/videos/${this.video_Id}/users/${this.user}/comments/${id}`, {
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
            fetch(`${URL}/videos/${this.video_Id}/users/${this.user}/comments/${id}`, {
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
                this.video_title = data.data.title
            })
        },
        sendVote: function() {
            fetch(`${this.devURL}/likes/video/${this.video_Id}/users/${this.user}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${this.token}`
                },
                body: JSON.stringify({"is_liked": this.is_liked})
            })
            .then((response) =>response.json())
            if (this.loggedin == false) {
                alert('You need to be logged in to vote')
            } else {
                this.updateVideoLikes()
                this.getVideoStats()
            }
        },
        triggerDislike: function() {
            if (this.is_liked) {
                this.is_liked = false
                this.sendVote()
                this.getVideoStats()
                this.showUserVote()
            } else {
                this.sendVote()
                this.getVideoStats
            }
        },
        triggerLike: function() {
            if (this.is_liked) {
                this.is_liked = false
            } else {
                this.sendVote()
                this.getVideoStats()
                this.showUserVote()
            }
        },
        getVideoStats: function() {
            fetch(`${this.devURL}/video/${this.video_Id}/likes`)
            .then((response) => response.json())
            .then((data) => {
                this.video_likes = data.likes
                this.video_dislikes = data.dislikes
            })
        },
        showUserVote: function() {
            // Based on vue parameters get the is_liked value for a user
            // Should be GET request
            fetch(`${this.devURL}/likes/show/${this.video_Id}/user/${this.user}`, {
                method: "get",
                headers: {"Content-Type": "application/json"},
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                let value = data.data[0].is_liked
                this.is_liked = value
            })
        }
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
                //TODO: with this line, the user stays logged in unless they log out 
                //accourding to https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html,
                // users should not have to refresh their browser when using Single Page Application.
                // localStorage.clear();
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


// $('.hamburgerdiv').on('click', () => {
//     $('.hamburgerdiv').toggleClass('open')
//     $('.hidden').toggleClass('show')
// })

let app = new Vue ({
    el: '#app',
    data: {
        displayvideo: false,
        redbg: false,
        greenbg: false,
        displaycomment: false,
        displaycomments: false,
        comments: [],
        devURL: "http://localhost:3000",
        prodURL: null,
        videos: [],
        videoSource: null,
    },
    methods: {
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
                this.comments = data.data
            })
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

        }
    },
    beforeMount(){
        this.getVideos()

        const checkIfLoggedIn = ()=> {
            let isLoggedIn = localStorage.getItem("vLoggedIn");
            console.log("isLoggedIn1",isLoggedIn);

            //convert string to boolean
            if (isLoggedIn == "true") {
                isLoggedIn = true;
            } else { // returned null, or undefined because login file has not run yet
                isLoggedIn = false;
            }

            console.log("isLoggedIn2",isLoggedIn);

            if(isLoggedIn) {
                console.log("loggedIn is true")
                //set variables in data from variables being passed from localStorage
                console.log("vUsername",localStorage.getItem("vUsername"));
            }else { 
                //don't do anything
                console.log("loggedIn is false")
            }
        }

        checkIfLoggedIn();
    }
})

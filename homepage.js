$('.hamburgerdiv').on('click', () => {
    $('.hamburgerdiv').toggleClass('open')
    $('.hidden').toggleClass('show')
})

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
        prodURL: null
    },
    methods: {
        displayVideo: function(event) {
            this.displayvideo = true
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
        }
    }
})
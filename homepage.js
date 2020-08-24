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
        displaycomments: false
    },
    methods: {
        displayVideo: function(event) {
            this.displayvideo = true
        },
        displayHomepage: function(event) {
            this.displayvideo = false
        },
        signUpToComment: function(event) {
            alert("You must be logged in to comment")
        }
    }
})
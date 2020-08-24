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
        prodURL: null,
        videos: [],
        fields: "fields=items(id(videoId),snippet(title))",
        part: "part=id,snippet"
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
        },
        getVideos: function() {
            fetch(`${this.devURL}/videos`)
            .then((response) => response.json())
            .then((data) => {
                this.videos = data.response
            })
        }
    },
    beforeMount(){
        this.getVideos()
    }
})

// TESTING DO NOT PUSH TO DEV PR JM-IMPLEMENT-FETCH-DATA-FROM-DB
// Code to populate database

// JENDRI CODE
const API_KEY = "AIzaSyDw5mk-09qwY2AFK06t0iE25JQqNHqxEiI"
const URL = 'http://localhost:3000'
const getAllJavascriptVideos = async () => {
    const fields = 'fields=items(id(videoId),snippet(title,thumbnails))'
     const part = "part=id,snippet"
     // returns an object {items : [ {id:{}, snippet:{}} ]}
     let res = await fetch(`https://www.googleapis.com/youtube/v3/search?${part}&${fields}&maxResults=25&q=javascript&key=${API_KEY}`)
     let arr = await res.json() // object     // define fetch function that creates videos on database
     // Video model takes in title, like_count, dislike_count, videoID
     let objArr = arr.items
     console.log(await objArr)
     objArr.forEach(async (element) => {
        let obj = await element.snippet
        let videoObj = { "title": obj.title, "like_count": 0, "dislike_count": 0, "videoID": element.id.videoId,
                        "thumb_default": obj.thumbnails.default.url, "thumb_medium": obj.thumbnails.medium.url, "thumb_high": obj.thumbnails.high.url}
        fetch(`${URL}/videos`, {
             method: 'post',
             headers: {
                 "content-type": "application/json"
             },
             body: JSON.stringify(videoObj)
         })
     });
 }
 getAllJavascriptVideos()
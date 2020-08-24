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
                console.log(data.data)
            })
        },
        // Get thumbnails from our database
        getVideos: function() {
            fetch(`${this.devURL}/videos`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.videos = data
                console.log(data)
            })
        }
    },
    // Calls in a function as soon as the page is loaded
    beforeMount(){
        this.getVideos()
    }
})


// // JENDRI CODE
// const API_KEY = ""
// const URL = "http://localhost:3000"

// const getAllJavascriptVideos = async () => {
//     const fields = 'fields=items(id(videoId),snippet(title))'
//     const part = "part=id,snippet"
//     // returns an object {items : [ {id:{}, snippet:{}} ]}
//     let res = await fetch(`https://www.googleapis.com/youtube/v3/search?${part}&${fields}&maxResults=25&q=javascript&key=${API_KEY}`)
//     let arr = await res.json() // object

//     // define fetch function that creates videos on database
//     // Video model takes in title, like_count, dislike_count, videoID
//     let objArr = arr.items
//     console.log(arr)
//     objArr.forEach(async (element) => {
//         let videoObj =  { "title": element.snippet.title, "like_count": 0, "dislike_count": 0, "videoID": element.id.videoId}
//         await fetch(`${URL}/videos`, {
//             method: 'post',
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(videoObj)
//         })
//     });
// }
// getAllJavascriptVideos()

// const test = new Vue({
//     el: '#test',
//     data: {
//         items: null,
//         message: 'hi'
//     },
//     methods: {
//         getAllYoutubeVideos: function() {
//             const fields = 'items(id,snippet(title))'
//             const part = 'id,snippet'
//             // returns array of video objects [ {id: {kind: string, videoId: string}, snippet{title: string}}) ]
//             let data = fetch(`https://www.googleapis.com/youtube/v3/search?part=${part}&fields=${fields}&maxResults=25&q=javascript&key=${API_KEY}`)
//                 .then(response => response.json())
//                 .then(res => res)
            
//             data.array.forEach(element => {
//                 console.log(element)
//             });
//         }
//     },
//     // Called right before mounting begins
//     beforeMount(){
//         // Should call a function that displays youtube videos
//         this.getAllYoutubeVideos()
//     }
// })


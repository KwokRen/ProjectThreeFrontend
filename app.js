const API_KEY = ""
const URL = "http://localhost:3000"

const getAllJavascriptVideos = async () => {
    const fields = 'fields=items(id(videoId),snippet(title))'
    const part = "part=id,snippet"
    // returns an object {items : [ {id:{}, snippet:{}} ]}
    let res = await fetch(`https://www.googleapis.com/youtube/v3/search?${part}&${fields}&maxResults=25&q=javascript&key=${API_KEY}`)
    let arr = await res.json() // object

    // define fetch function that creates videos on database
    // Video model takes in title, like_count, dislike_count, videoID
    let objArr = arr.items
    console.log(arr)
    objArr.forEach(async (element) => {
        let videoObj =  { "title": element.snippet.title, "like_count": 0, "dislike_count": 0, "videoID": element.id.videoId}
        await fetch(`${URL}/videos`, {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(videoObj)
        })
    });
}
getAllJavascriptVideos()

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




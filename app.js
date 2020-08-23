const API_KEY = 'AIzaSyDw5mk-09qwY2AFK06t0iE25JQqNHqxEiI'

const getAllJavascriptVideos = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=javascript&key=${API_KEY}`)
    console.log(await response.json())
}

getAllJavascriptVideos()
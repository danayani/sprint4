import Axios from 'axios'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'youTubeDB'
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_LIST_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_API_KEY = 'AIzaSyB5v55g9cBOMEeKdzXBXnwlJJS_Nw_95xU'
// const YOUTUBE_API_KEY = 'AIzaSyBzTuzz0vYVUZbDJ9IbfEZHuOksCnlsQO8'
// const YOUTUBE_API_KEY = 'AIzaSyDMkZ45uPWfL86Lq_GO89Ayl63v-H6Q7qU'
var gYouTube = utilService.loadFromStorage(STORAGE_KEY)

export const youtubeService = {
    getServerSideProps,
    getListItemYouTube,
    getServerSideSearch,
    getSongDuration,
    // getSearchResults
}

function getListItemYouTube() {
    const itemList = []
    getServerSideProps().then(res => {
        res.data.items.map((item) => {
            itemList.push(item)
        })
    })

}

async function getServerSideProps() {
    console.log('gYouTube', gYouTube)
    if (gYouTube) {
        console.log('FROM CACHE')
    }
    else {
        console.log('send req to YT api')
        const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLujQBQSxjHDeycqzFuiGfozofN-PB4XYW&key=${YOUTUBE_API_KEY}`)
        console.log('res', res)
        const data = await res.json()

        gYouTube = {
            data,
            res
        }
        utilService.saveToStorage(STORAGE_KEY, gYouTube)
        console.log('youTube save to storage')
    }
    return gYouTube
}

//TODO: need wait mathod
async function getServerSideSearch(searchKey) {
    console.log('youtube.service is searching for: ', searchKey)
    const res = await fetch(`${YOUTUBE_LIST_SEARCH_API}?part=snippet&order=viewCount&maxResults=6&type=video&q=${searchKey}}&key=${YOUTUBE_API_KEY}`)
    const data = await res.json()
    console.log(data)
    const songs = data.items.map(song => ({
        "id": song.id.videoId,
        "title": song.snippet.title,
        "createdBy": song.snippet.channelTitle,
        "url": `https://www.youtube.com/watch?v=${song.id.videoId}`,
        "imgUrl": song.snippet.thumbnails.default.url,
        "addedBy": {
            "_id": "",
            "userfullname": ""
        },
        "addedAt": Date.now(),
        "duration": (0)
    }))
    return songs
}

async function getSongDuration(songId) {
    console.log('getPlaylistInfo ')
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=contentDetails&key=${YOUTUBE_API_KEY}`)

    const data = await res.json()
    const duration = data.items[0].contentDetails.duration
    console.log(duration)
    const time = utilService.getSecFromTimePatern(duration)

    return time //hm5s15
}

// async function getSearchResults(searchWord) {
//     let searchResults = utilService.loadFromStorage(searchWord)
//     if (!searchResults || !searchResults.length) {
//         try {
//             searchResults = getServerSideSearch(searchWord)
//             utilService.saveToStorage(songKey, searchResults)
//         } catch (err) {
//             console.error('cannot find that particular song', err)
//             throw err
//         }
//     }
//    return searchResults
// }













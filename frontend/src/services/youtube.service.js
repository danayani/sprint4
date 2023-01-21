import Axios from 'axios'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'youTubeDB'
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_LIST_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_API_KEY = 'AIzaSyChgR_8uhRdBdWcZnrNpR0_xqYk_nwZu60'
var gYouTube = utilService.loadFromStorage(STORAGE_KEY)

export const youtubeService = {
    getServerSideProps,
    getListItemYouTube,
    getServerSideSearch
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
    // console.log('getServerSideSearch')
    // if (gYouTube) {
    //     console.log('FROM CACHE')
    // }
    // else {
    console.log('search ', searchKey)
    const res = await fetch(`${YOUTUBE_LIST_SEARCH_API}?part=snippet&order=viewCount&maxResults=6&type=video&q=${searchKey}}&key=${YOUTUBE_API_KEY}`)

    console.log('res search', res)
    const data = await res.json()
    console.log('data search', data)
    // gYouTube = {
    //     data,
    //     res
    // }
    //     utilService.saveToStorage(STORAGE_KEY, gYouTube)
    //     console.log('youTube save to storage')
    // }
    return data
}














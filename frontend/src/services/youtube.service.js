import Axios from 'axios'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'youTubeDB'
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_API_KEY = 'AIzaSyChgR_8uhRdBdWcZnrNpR0_xqYk_nwZu60'
var gYouTube = utilService.loadFromStorage(STORAGE_KEY)

export const youtubeService = {
    getServerSideProps,
    getServerSideProps2,
    getServerSidePropsSync
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












function getServerSidePropsSync() {
    const check = fetchMoviesHandler()
    // console.log('WTF', check);
    return check
}


function fetchMoviesHandler() {
    const res = async () => {
        try {
            const response = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLujQBQSxjHDeycqzFuiGfozofN-PB4XYW&key=${YOUTUBE_API_KEY}`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log('WTF3',await data);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    // =  fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLujQBQSxjHDeycqzFuiGfozofN-PB4XYW&key=${YOUTUBE_API_KEY}`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => data.results);
    console.log('WTF2', res);
    return res
}


function getServerSideProps2() {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText)
            console.log(res)
        }
    }
    xhr.open('GET', `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLujQBQSxjHDeycqzFuiGfozofN-PB4XYW&key=${YOUTUBE_API_KEY}`)
    xhr.send()
}



// function getServerSideProps() {
//     fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLujQBQSxjHDeycqzFuiGfozofN-PB4XYW&key=${YOUTUBE_API_KEY}`)
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             return data.results

//             // const transformedMovies = data.results.map((movieData) => {
//             //   return {
//             //     id: movieData.episode_id,
//             //     title: movieData.title,
//             //     openingText: movieData.opening_crawl,
//             //     releaseDate: movieData.release_date,
//             //   };
//             // });
//             // setMovies(transformedMovies);
//         });
// }
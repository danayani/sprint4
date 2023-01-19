
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_API_KEY = 'AIzaSyChgR_8uhRdBdWcZnrNpR0_xqYk_nwZu60'

export const youtubeService = {
    getServerSideProps
}

async function getServerSideProps(){
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLujQBQSxjHDeycqzFuiGfozofN-PB4XYW&key=${YOUTUBE_API_KEY}`)
    console.log(res)
    const data = await res.json()

    return{
            data 
    }

}
import { Loader } from "../cmps/loader.jsx"

export function LikedSongs() {
    const [likedSongs,setLikedSongs] = useState([])


    if(!songs) <Loader/>
    return (
        <h1>hi from liked songs</h1>
    )
}
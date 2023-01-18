import {AppPreview} from './app-preview';
//render the songs inside the station
export function SongsList({songs,removeSong,addSong}){

    return (
       <ul className='app-list'>
        {songs.map(song =>{
        {console.log('hello from song list',song)}
        <li className='app-preview' key={song._id}>
            <AppPreview song={song} />

        </li>})
        }
       </ul>

    )
}
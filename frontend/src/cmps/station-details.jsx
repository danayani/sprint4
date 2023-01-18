//render the songs inside the station


import {AppPreview} from './station.preview';
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
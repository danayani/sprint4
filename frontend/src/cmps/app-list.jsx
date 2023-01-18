import {AppPreview} from './app-preview'

export function AppList({songs,removeSong,addSong}){

    return (
       <ul className='app-list'>
        {songs.map(song =>
        <li className='app-preview' key={song._id}>
            <AppPreview song={song} />



        </li>)}
       </ul>

    )
}
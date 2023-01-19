//render the songs inside the station


import { StationPreview } from './station.preview';

export function StationDetails({station,removeSong,addSong}){

    return (
       <ul className='songs-list'>
        {station.songs.map(song => {
        {console.log('hello from song list',song)}
        <li className='song-preview' key={song.id}>
            <StationPreview song={song} />

        </li>})
        }
       </ul>

    )
}
import data from '../data/station-data.json';
import { SongsList } from './song-list';



export function StationList(){
    return(
        <ul className='station-list'>
            <h1>i am a station list</h1>
            {data.map(station =>{
                {console.log('hello from station list',station)}
                <li className='station-card' key={station._id}>
                    <h3>1</h3>
                    
                    <SongsList station={station}/>
                </li>
            })
            }
        </ul>
    )
}
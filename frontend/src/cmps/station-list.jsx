// renders the stations list

import { NavLink } from 'react-router-dom';
import { SongsList } from './station-details';
import station  from '../data/station-data.json'


export function StationList(){
    console.log('station list :>> ', station);
    return(
        
        <ul className='station-list'>
            {station.map(station => 
            <NavLink key={station._id} to={`/${station._id}`}></NavLink>)}

        </ul>

)}


// <ul className='station-list'>
//     <h1>i am a station list</h1>
//     {data.map(station =>{
//         {console.log('hello from station list',station)}
//         <li className='station-card' key={station._id}>
//             <h3>1</h3>
            
//             <SongsList station={station}/>
//         </li>
//     })
//     }
// </ul>
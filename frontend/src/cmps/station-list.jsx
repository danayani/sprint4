// gets the stations from Home and renders the stations list

import { Link } from 'react-router-dom';
import { StationDetails } from './station-details';

export function StationList({ stations }){
    console.log('stations list :>> ', stations);
    
    //  TODO: add the station-preview cmp
    return(
        <section className='station-lists'>
            {stations.map(station => 
            <Link to={`/station/${station._id}`}>
                <h3>{station.name}</h3>
                <button className='play'>Play</button>
            </Link>
            )}
        </section>
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
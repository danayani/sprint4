// gets the stations from Home and renders the stations list

// import { NavLink } from 'react-router-dom';
import { StationDetails } from './station-details';

export function StationList({stations}){
    console.log('stations list :>> ', stations);
    return(
        
        <ul className='station-list'>
            {stations.map(station => 
            <li className='station-preview' key={station._id}>
                <h3>{station.name}</h3>
                <StationDetails station={station}/>
                <button className='play'>Play</button>
            </li>)}

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
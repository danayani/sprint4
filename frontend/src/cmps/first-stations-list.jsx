// gets the stations from Home and renders the stations list

import { Link } from 'react-router-dom';
import { StationDetails } from './station-details';

export function FirstStationList({ stations }) {
    console.log('stations list :>> ', stations);

    // const firstSixStation = stations.splice(0,5)

    //  TODO: add the station-preview cmp
    return (
        // Should we splice the stations array to display the first 6?
        <section className='first-station-cards'>
            {stations.map(station =>
                <Link to={`/station/${station._id}`}>
                    <div className="station-card">
                        {/* <StationDetails /> */}
                        
                        <img className="song-img" src={station.songs[0].imgUrl} alt="song img" />
                        <h3>{station.name}</h3>
                        <button className='play'>Play</button>
                    </div>
                </Link>
            )}
        </section>
    )
}

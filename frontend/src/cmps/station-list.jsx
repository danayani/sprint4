// gets the stations from Home and renders the stations list

import { Link } from 'react-router-dom';
import { StationDetails } from './station-details';

export function StationList({ stations }) {
    console.log('stations list :>> ', stations);

    // const firstSixStation = stations.splice(0,5)

    //  TODO: add the station-preview cmp
    return (
        // Should we splice the stations array to display the first 6?
        <section className='stations-cards'>
            {stations.map(station =>
                <Link to={`/station/${station._id}`}>
                    <div className="station-card">
                        {/* <StationDetails /> */}
                        <h3>{station.name}</h3>
                        <button className='play'>Play</button>
                    </div>
                </Link>
            )}







            <div className='footer-spacer'>
                <h2 className='footer-filler'></h2>
                <hr />
                <h2 className='footer-filler'></h2>
            </div>
        </section>
    )
}

// gets the stations from Home and renders the stations list

import { Link } from 'react-router-dom';

export function FirstStationList({ stations }) {
    console.log('stations list :>> ', stations);

    return (
        <section className='first-station-cards'>
            {stations.map(station =>
                <Link key={station._id} to={`/${station._id}`}>
                    <div className="first-station-card">
                        
                        <img className="song-img" src={station.songs[0].imgUrl} alt="song img" />
                        <h3>{station.name}</h3>
                        {/* <button className='play'>Play</button> */}
                    </div>
                </Link>
            )}
        </section>
    )
}

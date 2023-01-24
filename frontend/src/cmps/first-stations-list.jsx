import { Link } from 'react-router-dom';

export function FirstStationList({ stations }) {

    return (
        <section className='first-station-cards'>
            {stations.map(station =>
                <Link key={station._id} to={`/${station._id}`}>
                    <div className="first-station-card">
                        
                        <img className="song-img" src={station.imgUrl} alt="song img" />
                        <h3>{station.name}</h3>
                        {/* <button className='play'>Play</button> */}
                    </div>
                </Link>
            )}
        </section>
    )
}

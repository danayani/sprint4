import { Link } from "react-router-dom";

export function SecondStationList ({ stations }){
    return (
        <section>
            {stations.map(station =>
                <Link to={`/station/${station._id}`}>
                    <div className="second-station-card">
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

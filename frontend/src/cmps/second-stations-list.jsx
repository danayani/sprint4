import { Link } from "react-router-dom";

export function SecondStationList ({ stations }){
    return (
        <section className="second-station-cards">
            <h2>Made For Shachak</h2>
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
            <h2>Recommended songs</h2>
        </section>
    )

}

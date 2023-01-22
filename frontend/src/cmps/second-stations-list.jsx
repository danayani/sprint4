import { Link } from "react-router-dom";

export function SecondStationList({ stations }) {
    return (
        <section className="second-station-container">
            <h2>Made For Shachak</h2>
            <section className="second-station-cards">
                {stations.map(station =>
                    <Link key={station._id} to={`/station/${station._id}`}>
                        <div className="second-station-card">
                            {/* <StationDetails /> */}
                            <img className="song-img" src={station.songs[0].imgUrl} alt="song img" />
                            <h3>{station.name}</h3>
                            {/* <button className='play'>Play</button> */}
                        </div>
                    </Link>
                )}
            </section>
            <h2>Recommended songs</h2>
        </section>
    )

}

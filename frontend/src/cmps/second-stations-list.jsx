import { Link } from "react-router-dom";

export function SecondStationList({ stations }) {
    return (
        <section className="second-station-container">
            <h2>Made For You</h2>
            <section className="second-station-cards">
                {stations.map(station =>
                    <Link key={station._id} to={`/station/${station._id}`}>
                        <div className="second-station-card">
                            <img className="song-card-img" src={station.imgUrl} alt="song img" />
                            <h3>{station.name}</h3>
                            {/* <button className='play'>Play</button> */}
                        </div>
                    </Link>
                )}
            </section>
            <h2 className="station-extra">Recommended songs</h2>
        </section>
    )

}

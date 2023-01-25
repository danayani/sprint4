// import { youtubeService } from "../services/youtube.service";
import { NavLink } from "react-bootstrap";
import { stationService } from "../services/station.service.js";
// import { utilService } from "../services/util.service";


export function Search() {
    const geners = stationService.getMusicGeners()


    function onFilterCardClicked(filterByGener) {}

    return (
        <main className="main-search-container">
            <h2>Browse all</h2>

            <section className="filter-cards-container">
                {geners.map((gener, idx) =>
                    <NavLink to={`/${gener.name}`} key={idx} >
                        <div className="filter-card" onClick={onFilterCardClicked(gener)} style={{ backgroundColor: gener.bgc }}>
                            <h2>{gener.name}</h2>
                            <img className="filter-img" src={gener.imgUrl} alt="filter img" />
                            {/* <button className='play'>Play</button> */}
                        </div>
                    </NavLink>

                )}
            </section>

        </main>
    )
}
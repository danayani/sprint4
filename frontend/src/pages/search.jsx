// import { youtubeService } from "../services/youtube.service";
import { NavLink } from "react-bootstrap";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { stationService } from "../services/station.service.js";
import { youtubeService } from "../services/youtube.service.js";
// import { utilService } from "../services/util.service";


export function Search() {
    // const params = useParams()
    const location = useLocation()
    console.log('location',location)
    console.log('locationkey',location.key)

    const song = location.search
    console.log('song',song)

    let songKey = song.slice(11)
    console.log('songKey',songKey)

    youtubeService.getServerSideSearch(songKey)
    .then(res=>{
        let songs = res.items
        console.log('songs from search',songs)
    })
    .catch((err)=>{
        console.log('cannot find that particular song')
    })


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
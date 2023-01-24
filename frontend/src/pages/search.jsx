import { youtubeService } from "../services/youtube.service";
import { stationService } from "../services/station.service.js";


export function Search() {
    const geners = stationService.getMusicGeners()
    console.log('geners from search', geners)

    // when a card is clicked it sends a req to youtube
    function onFilterCardClicked(filterByGener) {
        // call the search function from youtube.

        // const searchRes = youtubeService.getServerSideSearch()
        // con sole.log('searchRes :>> ', searchRes);
    }

    return (
        <main className="main-search-container">
            <h2>Browse all</h2>

            <section className="filter-cards-container">
                {geners.map((gener, idx) =>

                    <div key={idx} className="filter-card" onClick={onFilterCardClicked(gener)} style={{backgroundColor: gener.bgc }}>
                        <h2>{gener.name}</h2>
                        <img className="filter-img" src={gener.imgUrl} alt="filter img" />
                        {/* <button className='play'>Play</button> */}
                    </div>

                )}
            </section>

        </main>
    )
}
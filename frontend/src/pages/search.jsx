import { youtubeService } from "../services/youtube.service";
import { stationService } from "../services/station.service.js";


export function Search() {
    const geners = stationService.getMusicGeners()
    // console.log('geners from search', geners)

    // when a card is clicked it sends a req to youtube
    function onFilterCardClicked(filterByGener) {
        // call the search function from youtube.
        // const searchRes = youtubeService.getServerSideSearch()
        // console.log('searchRes :>> ', searchRes);
    }

    return (
        <main className="main-search-container">
            <h2>Browse all</h2>

            <section className="filter-cards-container">
                {geners.map(gener =>

                    <div className="filter-card" onClick={onFilterCardClicked(gener)}>
                        <h3>{gener}</h3>
                        <img className="filter-img" src="" alt="filter img" />
                        {/* <button className='play'>Play</button> */}
                    </div>

                )}
            </section>

        </main>
    )
}
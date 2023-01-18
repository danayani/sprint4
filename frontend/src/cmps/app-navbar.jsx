// Navigation to different pages 
import logo from '../assets/img/spotify-logo.png'

//230px
//can be showen as grid with 1 clu

return (
    <section className="nav-bar">
        {logo}
        {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}
        <br />
        Home
        <br />
        Search
        <br />
        Your library
        <br />
        Create Playlist
        <br />
        Liked songs
        <br />
        play lists
    </section>
)
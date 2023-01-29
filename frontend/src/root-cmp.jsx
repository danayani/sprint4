import { Provider } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './store/store.js'

import { AppHeader } from './cmps/app-header.jsx'
import { Home } from './pages/home.jsx'
import { AboutUs } from './pages/about.jsx'
import { StationDetails } from './pages/station-details.jsx'
import { Library } from './pages/library.jsx'
import { AppNavBar } from './cmps/app-navbar.jsx'
import { AppPlayer } from './cmps/app-player.jsx'
import { LoginSignup } from './cmps/login-singup.jsx'
import { Search } from './pages/search.jsx'
import { CreateStation } from './pages/create-station.jsx'
import { LikedSongs } from './pages/liked-songs.jsx'

export function RootCmp() {
    return (
        <Provider store={store}>
            <Router>
                <section className='main-layout'>
                    <AppHeader />
                    <AppNavBar />
                    <main className='main-app-container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:stationId" element={<StationDetails />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/library" element={<Library />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/create-station" element={<CreateStation />} />
                            <Route path="/login-signug/:login" element={<LoginSignup />} />
                            <Route path="/liked-songs" element={<LikedSongs />} />
                        </Routes>
                    </main>
                    <hr />
                    <AppPlayer />
                </section>
            </Router>
        </Provider>
    )
}



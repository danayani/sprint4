import { Provider } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './store/store.js'

import { AppHeader } from './cmps/app-header'
import { Home } from './pages/home'
import { AboutUs } from './pages/about'
import { Station } from './pages/station'
import { Library } from './pages/library'
import { AppNavBar } from './cmps/app-navbar'
import { AppPlayer } from './cmps/app-player.jsx';
import { LoginSignup } from './cmps/login-singup.jsx'
import { Search } from './pages/search.jsx'
import { CreateStation } from './pages/create-station.jsx'

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
                            <Route path="/:stationId" element={<Station />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/library" element={<Library />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/create-station" element={<CreateStation />} />
                            <Route path='/login-signug/:login' element={<LoginSignup />} />
                        </Routes>
                        <hr />
                    </main>
                    <AppPlayer />
                </section>
            </Router>
        </Provider>
    )
}



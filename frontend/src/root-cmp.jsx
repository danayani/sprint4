import { Provider } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './store/store.js';

import { AppHeader } from './cmps/app-header'
import { StationList } from './cmps/station-list'
import { Home } from './pages/home'
import { AboutUs } from './pages/about'
import { Library } from './pages/library'
import { AppNavBar } from './cmps/app-navbar'

export function RootCmp() {
    return (
        <Provider store={store}>
            <Router>
                <section className='main-layout'>
                    <AppHeader />
                    <AppNavBar />
                    <main className='main-container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:stationId" element={<StationList />} />

                            <Route path="/about" element={<AboutUs />} />
                            <Route path='/library' element={<Library />} />
                            {/* <Route path="/search" element={<SearchPage />} /> */}
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}



import React from 'react'
import { Routes, Route } from 'react-router'

// import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { StationList } from './cmps/station-list'
import { Home } from './pages/home'
import { AboutUs } from './pages/about'
import { Library } from './pages/library'
import { AppNavBar } from './cmps/app-navbar'

export function RootCmp() {
    return (
        <div>
            <AppHeader />
            <main className='main-layout main-container'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:stationId" element={<StationList />} />

                    <Route path="/about" element={<AboutUs />} />
                    <Route path='/library' element={<Library />} />
                    {/* <Route path="/search" element={<SearchPage />} /> */}
                </Routes>
            </main>
            <AppNavBar />
        </div>
    )
}



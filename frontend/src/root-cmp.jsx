import React from 'react'
import { Routes, Route } from 'react-router'

// import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { StationList } from './cmps/station-list'
import { HomePage } from './pages/home'
import { AboutUs } from './pages/about'
import { LibraryIndex } from './pages/library'

export function RootCmp() {
    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:stationId" element={<StationList />} />

                    <Route path="/about" element={<AboutUs />} />
                    <Route path='/library' element={<LibraryIndex />} />

                    {/* <Route path="/search" element={<SearchPage />} /> */}
                </Routes>
            </main>
        </div>
    )
}



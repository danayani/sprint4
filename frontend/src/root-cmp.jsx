import React from 'react'
import { Routes, Route } from 'react-router'

// import routes from './routes'

import { AppHeader } from './cmps/app-header'
// import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home'
import { AboutUs } from './pages/about'
import { LibraryIndex } from './pages/library'
import { AppNavBar } from './cmps/app-navbar'

export function RootCmp() {
    return (
        <div>
            <AppHeader />
            <AppNavBar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path='/library' element={<LibraryIndex />} />
                    {/* <Route path="/search" element={<SearchPage />} /> */}
                </Routes>
            </main>
        </div>
    )
}



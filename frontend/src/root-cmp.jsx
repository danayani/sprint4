import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { AboutUs } from './pages/about-us'

export function RootCmp() {
    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} /> */}

                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    {/* <Route path='/library' element={<Library />} /> */}
                    {/* <Route path="/search" element={<SearchPage />} /> */}

                </Routes>
            </main>
        </div>
    )
}



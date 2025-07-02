import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className='h-full px-2  mx-auto'>
                <Outlet />
            </main>
        </>

    )
}

export default Layout
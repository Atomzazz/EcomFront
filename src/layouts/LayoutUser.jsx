import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const LayoutUser = () => {
    return (
        <>
            <Navbar />
            <main className='h-full px-2 mx-auto'>
                <Outlet />
            </main>
        </>

    )
}

export default LayoutUser
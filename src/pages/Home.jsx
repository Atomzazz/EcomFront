import React from 'react'
import HomeSlide from '../components/home/HomeSlide'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
    <div
     className='mt-20'>
    <HomeSlide/>
  
    <BestSeller/>

<div className='bg-gray-100 py-10 mb-10'>
    <NewProduct/>
    </  div>
    </div>


  )
}

export default Home
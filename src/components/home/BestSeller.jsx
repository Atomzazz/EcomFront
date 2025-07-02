import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShow from '../../util/SwiperShow'
import { SwiperSlide } from 'swiper/react'

const BestSeller = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    listProductBy('sold', 'desc', 10)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="max-w-full mx-auto  px-4 py-10 mt-10">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
        🔥 สินค้าขายดี
      </h2>

      {/* ✅ Swiper container */}
      <div className="py-4 rounded-lg shadow-  px-2 pb-10">
        <SwiperShow>
          {data.map((item, i) => (
            <SwiperSlide key={i}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </SwiperShow>
      </div>


    </div>
  )
}

export default BestSeller

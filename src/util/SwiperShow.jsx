import React from 'react'
import { Swiper } from 'swiper/react'
import {
  Autoplay,
  Pagination,
  Navigation,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SwiperShow = ({ children }) => {
  return (
    <>
   <Swiper
  slidesPerView={1.2}
  spaceBetween={12}
  pagination={{
    clickable: true,
    bulletClass: 'swiper-pagination-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active',
  }}
  breakpoints={{
    640: { slidesPerView: 2, spaceBetween: 16 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 24 },
    1280: { slidesPerView: 6, spaceBetween: 20 },
  }}
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  modules={[Autoplay, Pagination, Navigation, Mousewheel, Keyboard]}
  navigation
  className="mySwiper !pb-8" // 👈 เพิ่ม padding bottom ให้ Swiper
>
  {children}
</Swiper>


      {/* ✅ จุดกลมแยกออกมาใต้ Swiper */}
      <div className="custom-pagination mt-4 flex justify-center" />
    </>
  )
}

export default SwiperShow

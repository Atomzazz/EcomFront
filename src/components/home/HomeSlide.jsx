import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
  Autoplay,
  Pagination,
  Navigation,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import useEcomStore from '../../store/ecom-stotr'

const HomeSlide = () => {
  // ✅ ดึงข้อมูลทั้ง homeImages และ products
  const fetchHomeImages = useEcomStore((s) => s.fetchHomeImages)
  const homeImages = useEcomStore((s) => s.homeImages)

  const getProduct = useEcomStore((s) => s.getProduct)
  const product = useEcomStore((s) => s.products) || []

  useEffect(() => {
    fetchHomeImages({ featured: true }) // ✅ โหลดเฉพาะรูปที่เลือก
    getProduct(50)
  }, [])


  
  return (
    <div>
      {/* 🔝 Swiper บน: ใช้ภาพจากหน้า HomeManage */}
   <Swiper
  spaceBetween={30}
  pagination={{ clickable: true }}
  autoplay={{ delay: 2000, disableOnInteraction: false }}
  modules={[Pagination, Autoplay]}
  className="mySwiper mb-6"
>
  {homeImages.map((img, i) => (
    <SwiperSlide key={i}>
      <img
        src={img.secure_url}
        alt={img.title}
        className="w-full h-[180px] sm:h-[250px] md:h-[300px] lg:h-[384px] object-cover rounded-lg"
      />
    </SwiperSlide>
  ))}
</Swiper>



      {/* 🛒 Swiper ล่าง: แสดงสินค้า (product) */}
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation, Mousewheel, Keyboard]}
        navigation={true}
        className="mySwiper"
      >
        {product.map((item, i) => (
          <SwiperSlide key={i}>
            {item.images?.[0]?.url ? (
              <img
                src={item.images[0].url}
                className="w-full h-40 object-contain rounded-md hover:scale-105 transition"
                alt={item.title || `product-${i}`}
              />
            ) : (
              <div className="w-full h-40 bg-neutral-200 flex items-center justify-center text-xs text-neutral-500 rounded-md">
                ไม่มีรูป
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeSlide

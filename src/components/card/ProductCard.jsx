import React from 'react'
import { ShoppingCart } from 'lucide-react'
import useEcomStore from '../../store/ecom-stotr'
import { numberFormat } from '../../util/number';
import { motion } from "framer-motion"

function ProductCard({ item }) {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        scale: { type: "spring", bounce: 0.4 },
      }}
      className="w-full"
    >
    <div className='w-full max-w-[260px] bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3 flex flex-col gap-2 mx-auto'>
  {/* ✅ รูปภาพสินค้า */}
  <div className='relative group'>
    {item.images && item.images.length > 0 ? (
      <img
        src={item.images[0].url}
        alt={item.title}
        className='w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105'
      />
    ) : (
      <div className='w-full h-32 sm:h-36 md:h-40 bg-slate-200 text-gray-500 flex items-center justify-center rounded-lg'>
        No image
      </div>
    )}
  </div>

        {/* ✅ ข้อมูลสินค้า */}
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-gray-800 truncate'>{item.title}</p>
          <p className='text-sm text-gray-500 truncate'>{item.description}</p>
        </div>

        {/* ✅ ราคา + ปุ่มเพิ่มตะกร้า */}
        <div className='flex justify-between items-center mt-auto'>
          <span className='text-lg font-bold text-emerald-600'>{numberFormat(item.price)}฿</span>
          <button
            onClick={() => actionAddtoCart(item)}
            className='bg-emerald-400 hover:bg-emerald-500 transition-colors text-white rounded-full p-2 shadow-md'
          >
            <ShoppingCart className='w-4 h-4' />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

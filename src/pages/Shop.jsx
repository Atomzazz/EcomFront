import React, { useEffect, useState } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-stotr'
import Search from '../components/card/Search'
import Cart from '../components/card/Cart'
import { Menu, Filter, X ,ShoppingBasket} from 'lucide-react'

const Shop = () => {
  const getProduct = useEcomStore((e) => e.getProduct)
  const products = useEcomStore((e) => e.products)
  const carts = useEcomStore((e) => e.carts)
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)
const totalItemCount = carts.reduce((total, item) => total + item.count, 0)
  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      {/* ✅ Layoutเดิมบนคอมพิวเตอร์: คงไว้ 100% */}
      <div className='hidden xl:flex mt-20'>
        {/* search */}
        <div className='w-1/4 p-4 mr-3 shadow-xl bg-gray-100 border-2 rounded-xl h-screen'>
          <Search />
        </div>

        {/* product */}
        <div className="w-1/2 p-4 h-screen overflow-y-auto mr-2 rounded-xl shadow-md bg-green-100 bg-opacity-60 backdrop-blur-sm">
          <p className='text-2xl font-bold mb-4'>สินค้าทั้งหมด</p>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
  {products.map((item, i) => (
    <ProductCard key={i} item={item} />
  ))}
</div>
        </div>

        {/* cart */}
        <div className='w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto rounded-xl border-2'>
          <Cart />
        </div>
      </div>

      {/* ✅ Layout มือถือ: ใช้ Drawer */}
      <div className="xl:hidden pt-[90px] pb-[72px] px-4 max-w-7xl mx-auto relative">

        {/* 🔘 Mobile Header */}
        <div className="fixed top-[64px] left-0 w-full flex justify-between items-center bg-white z-50 p-3 border-b">
          <button onClick={() => setShowCart(true)} className="text-emerald-600">
            
              {carts.length > 0 && (
              <span className="absolute top-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            )}
            <ShoppingBasket  />
            
          </button>
          <p className="text-xl font-semibold">สินค้า</p>
          <button onClick={() => setShowSearch(true)} className="text-emerald-600">
            <Filter />
          </button>
        </div>

        {/* 📦 Product Grid */}
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 mt-10">

          {products.map((item, i) => (
            <ProductCard key={i} item={item} />
          ))}
        </div>

        {/* 🔍 Search Drawer */}
        {showSearch && (
          <div className="fixed  mt-16 inset-0 z-50 bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              
              <button onClick={() => setShowSearch(false)}><X /></button>
            </div>
            <Search />
          </div>
        )}

        {/* 🛒 Cart Drawer */}
        {showCart && (
          <div className="fixed mt-16 inset-0 z-50 bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              
              <button onClick={() => setShowCart(false)}><X /></button>
            </div>
            <Cart />
          </div>
        )}
      </div>
    </>
  )
}

export default Shop

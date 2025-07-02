import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-stotr'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { numberFormat } from '../../util/number';
const Search = () => {
  const getProduct = useEcomStore((e) => e.getProduct)
  const searchFilters = useEcomStore((e) => e.searchFilters)
  const products = useEcomStore((e) => e.products)
  const getCategory = useEcomStore((e) => e.getCategory)
  const categories = useEcomStore((e) => e.categories)

  const [text, setText] = useState('')
  const [selectCategory, setSelectCategory] = useState([])
  const [price, setPrice] = useState([100, 100000])
  const [ok, setOk] = useState(false)

  // text search
  useEffect(() => {
    const delay = setTimeout(() => {
      text ? searchFilters({ query: text }) : getProduct()
    }, 300)
    return () => clearTimeout(delay)
  }, [text])

  useEffect(() => {
    getCategory()
  }, [])

  const handleCheck = (e) => {
    const value = e.target.value
    const current = [...selectCategory]
    const index = current.indexOf(value)

    if (index === -1) current.push(value)
    else current.splice(index, 1)

    setSelectCategory(current)

    current.length > 0 ? searchFilters({ category: current }) : getProduct()
  }

  // price filter
  useEffect(() => {
    searchFilters({ price })
  }, [ok])

  const handlePrice = (value) => {
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  return (
    <div className="space-y-6 text-sm font-sans text-gray-700">
      {/* ค้นหาด้วยชื่อ */}
      <div>
        <h2 className="text-base font-semibold mb-2">ค้นหาสินค้า</h2>
        <input
          type="text"
          placeholder="ค้นหาสินค้า..."
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />
      </div>

      {/* ค้นหาด้วยหมวดหมู่ */}
      <div>
        <h2 className="text-base font-semibold mb-2">หมวดหมู่สินค้า</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {categories.map((item, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCheck}
                className="accent-emerald-500"
              />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ค้นหาด้วยราคา */}
      <div>
        <h2 className="text-base font-semibold mb-2">ช่วงราคา</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>ต่ำสุด: {numberFormat(price[0])}</span>
          <span>สูงสุด: {numberFormat(price[1])}</span>
        </div>
        <Slider
          onChange={handlePrice}
          range
          min={0}
          max={100000}
          defaultValue={[100, 100000]}
          trackStyle={[{ backgroundColor: '#10B981' }]}
          handleStyle={[
            { borderColor: '#10B981' },
            { borderColor: '#10B981' },
          ]}
        />
      </div>
    </div>
  )
}

export default Search

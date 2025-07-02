import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-stotr'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { Link } from 'react-router-dom'
import { PlusCircle, Trash2, Edit3, Package, Eye } from 'lucide-react'
import { numberFormat } from '../../util/number';

const FormProduct = () => {
  const token = useEcomStore((e) => e.token)
  const getCategory = useEcomStore((e) => e.getCategory)
  const categories = useEcomStore((e) => e.categories)
  const getProduct = useEcomStore((e) => e.getProduct)
  const product = useEcomStore((e) => e.products) || []

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = product.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(product.length / itemsPerPage)

  const initState = {
    title: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: '',
    images: [],
  }

  const [form, setForm] = useState(initState)

  useEffect(() => {
    getCategory()
    getProduct(100)
  }, [])

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createProduct(token, form)
      setForm(initState)
      getProduct(100)
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ!!`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('ยืนยันการลบ')) {
      try {
        await deleteProduct(token, id)
        toast.success('ลบสินค้าเรียบร้อย')
        getProduct(100)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 text-neutral-800">
      {/* ฟอร์ม */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8 border border-neutral-200">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-neutral-800 flex items-center gap-2">
          <PlusCircle className="text-emerald-600" size={20} />
          เพิ่มสินค้าใหม่
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            className="border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleOnChange}
            placeholder="คำอธิบาย"
            className="border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleOnChange}
            type="number"
            placeholder="ราคา"
            className="border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
          />
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleOnChange}
            type="number"
            placeholder="จำนวน"
            className="border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
          />
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleOnChange}
            className="border border-neutral-300 rounded-md px-4 py-3 col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm md:text-base"
          >
            <option value="">เลือกหมวดหมู่</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="col-span-1 md:col-span-2">
            <UploadFile form={form} setForm={setForm} />
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md shadow inline-flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircle size={18} />
              เพิ่มสินค้า
            </button>
          </div>
        </form>
      </div>

      {/* รายการสินค้า */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-neutral-200">
        <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Package className="text-emerald-600" size={20} />
          รายการสินค้า ({product.length} รายการ)
        </h2>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-emerald-600 text-white text-center">
                <th className="p-3 border">No</th>
                <th className="p-3 border">รูป</th>
                <th className="p-3 border">ชื่อ</th>
                <th className="p-3 border">คำอธิบาย</th>
                <th className="p-3 border">ราคา</th>
                <th className="p-3 border">จำนวน</th>
                <th className="p-3 border">ขายแล้ว</th>
                <th className="p-3 border">อัปเดต</th>
                <th className="p-3 border text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((item, index) => (
                <tr key={item.id} className="hover:bg-neutral-100 transition">
                  <td className="p-3 border">{indexOfFirstItem + index + 1}</td>
                  <td className="p-3 border">
                    {item.images?.[0]?.url ? (
                      <img
                        src={item.images[0].url}
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-neutral-200 flex items-center justify-center text-xs text-neutral-500 rounded-md mx-auto">
                        ไม่มี
                      </div>
                    )}
                  </td>
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">{item.description}</td>
                  <td className="p-3 border">฿{numberFormat(item.price)}</td>
                  <td className="p-3 border">{item.quantity}</td>
                  <td className="p-3 border">{item.sold}</td>
                  <td className="p-3 border text-xs text-neutral-500">
                    {new Date(item.updateAt).toLocaleDateString('th-TH')}
                  </td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/product/${item.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                      >
                        <Edit3 size={14} />
                        แก้ไข
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                      >
                        <Trash2 size={14} />
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Card View */}
         <div className="lg:hidden space-y-4">
          {currentProducts.map((item, index) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              {/* Header with Number and Actions */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded font-medium">
                    #{indexOfFirstItem + index + 1}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">คงเหลือ:</span>
                    <span className="text-xs font-medium text-emerald-600">{item.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">ขายแล้ว:</span>
                    <span className="text-xs font-medium text-orange-600">{item.sold}</span>
                  </div>
                </div>
                <div className="hidden md:flex lg:hidden space-x-2">
                  <Link
                    to={`/admin/product/${item.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition-colors"
                  >
                    <Edit3 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>

              {/* Product Image and Info */}
              <div className="flex space-x-4 mb-3">
                <div className="flex-shrink-0">
                  {item.images?.[0]?.url ? (
                    <img
                      src={item.images[0].url}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-neutral-200 flex items-center justify-center text-xs text-neutral-500 rounded-md">
                      ไม่มีรูป
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-emerald-700">
                      ฿{numberFormat(item.price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      อัปเดต: {new Date(item.updateAt).toLocaleDateString('th-TH')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="sm:hidden flex space-x-2 pt-3 border-t border-gray-100">
                <Link
                  to={`/admin/product/${item.id}`}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <Edit3 size={16} />
                  แก้ไข
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* No Products Message */}
        {product.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <div className="text-lg mb-2">ยังไม่มีสินค้าในระบบ</div>
            <div className="text-sm">เริ่มต้นโดยการเพิ่มสินค้าแรกของคุณ</div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-1 md:gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded-md border text-sm transition ${
                  currentPage === i + 1
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-neutral-800 hover:bg-neutral-100 border-neutral-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormProduct
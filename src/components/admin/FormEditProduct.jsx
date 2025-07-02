import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-stotr'
import { readProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { useParams, useNavigate } from 'react-router-dom'

const FormEditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const token = useEcomStore((e) => e.token)
  const getCategory = useEcomStore((e) => e.getCategory)
  const categories = useEcomStore((e) => e.categories)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: '',
    images: [],
  })

  useEffect(() => {
    getCategory()
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await readProduct(token, id)
      setForm(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct(token, id, form)
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ!!`)
      navigate('/admin/product')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-6 py-8 bg-white shadow-md rounded-lg border border-neutral-200">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">แก้ไขสินค้า</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-neutral-800">
        <input
          type="text"
          name="title"
          placeholder="ชื่อสินค้า"
          value={form.title}
          onChange={handleOnChange}
          className="w-full border border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="text"
          name="description"
          placeholder="คำอธิบาย"
          value={form.description}
          onChange={handleOnChange}
          className="w-full border border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="number"
          name="price"
          placeholder="ราคา"
          value={form.price}
          onChange={handleOnChange}
          className="w-full border border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="number"
          name="quantity"
          placeholder="จำนวนสินค้า"
          value={form.quantity}
          onChange={handleOnChange}
          className="w-full border border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleOnChange}
          className="w-full border border-neutral-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        >
          <option value="" disabled>
            กรุณาเลือกหมวดหมู่
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <UploadFile form={form} setForm={setForm} />

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition"
          >
            บันทึกการแก้ไข
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/product')}
            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 px-6 py-2 rounded-md transition"
          >
            ย้อนกลับ
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormEditProduct

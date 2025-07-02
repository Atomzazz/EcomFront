import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import useEcomStore from '../../store/ecom-stotr'
import { numberFormat } from '../../util/number';

const Cart = () => {
  const carts = useEcomStore((state) => state.carts)
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
  const actionRemove = useEcomStore((state) => state.actionRemove)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>

      <div className="border p-4 rounded-lg bg-white shadow-sm space-y-4 max-h-[80vh] overflow-y-auto">
        {/* รายการสินค้า */}
        {carts.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg shadow-sm">
            <div className="flex justify-between items-center gap-3">
              {/* Image */}
              {item.images && item.images.length > 0 ? (
                <img src={item.images[0].url} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                  no image
                </div>
              )}

              {/* ข้อมูลสินค้า */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
              </div>

              {/* ลบ */}
              <button
                onClick={() => actionRemove(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* จำนวน & ราคา */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 border rounded-full px-2 py-1 bg-white shadow-sm">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="p-1 hover:bg-gray-200 rounded-full transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center">{item.count}</span>
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="p-1 hover:bg-gray-200 rounded-full transition"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="font-bold text-emerald-600">{numberFormat(item.price)} บาท</span>
            </div>
          </div>
        ))}

        {/* รวมราคา */}
        <div className="flex justify-between text-base font-semibold text-gray-700 border-t pt-3">
          <span>รวม</span>
          <span>{numberFormat(getTotalPrice())} บาท</span>
        </div>

        {/* ปุ่มชำระเงิน */}
        <Link to="/cart">
          <button className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 rounded-lg shadow-md transition">
            ดำเนินการชำระเงิน
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Cart

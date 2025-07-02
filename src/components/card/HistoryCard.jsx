import React, { useEffect, useState } from 'react'
import { getOrder } from '../../api/user'
import useEcomStore from '../../store/ecom-stotr'
import { numberFormat } from '../../util/number';

const HistoryCard = () => {
  const token = useEcomStore((e) => e.token)
  const [order, setOrder] = useState([])

  useEffect(() => {
    hdlGetOrder(token)
  }, [])

  const hdlGetOrder = async (token) => {
    try {
      const res = await getOrder(token)
      setOrder(res.data.order || res.data) // รองรับทั้งแบบมี .order และไม่มี
    } catch (err) {
      console.error(err)
    }
  }


  const changeColor = (status) => {
    if (status === "สำเร็จ") {
      return "bg-emerald-100 text-emerald-700";
    } else if (status === "ไม่สำเร็จ" || status === "ยกเลิก") {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-20  ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 ประวัติการสั่งซื้อ</h1>
      {order
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">โดย: {item.orderBy?.email || 'ไม่ระบุ'}</p>
                <p className="text-md font-medium text-gray-800">
                  {new Date(item.updateAt).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${changeColor(item.orderStatus)}`}
              >
                {item.orderStatus}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200 rounded-md overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">สินค้า</th>
                    <th className="px-4 py-2 text-right">ราคา</th>
                    <th className="px-4 py-2 text-center">จำนวน</th>
                    <th className="px-4 py-2 text-right">รวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {item.products?.map((product, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{product.product?.title || 'ไม่มีชื่อ'}</td>
                      <td className="px-4 py-2 text-right">{numberFormat(product.product?.price) || 0}฿</td>
                      <td className="px-4 py-2 text-center">{product.count}</td>
                      <td className="px-4 py-2 text-right font-medium">
                        {numberFormat(product.count * product.product?.price) || 0}฿
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">ราคาสุทธิ</p>
                <p className="text-xl font-bold text-emerald-600">{numberFormat(item.cartTotal)} ฿</p>
              </div>
            </div>
          </div>
        ))}

      {order.length === 0 && (
        <div className="text-center text-gray-500 py-12">คุณยังไม่มีประวัติการสั่งซื้อสินค้า</div>
      )}
    </div>
  )
}

export default HistoryCard

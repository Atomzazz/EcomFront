import React, { useEffect, useState } from 'react';
import useEcomStore from '../../store/ecom-stotr';
import { getOrderAdmin, changeOrderStatus } from '../../api/admin';
import { Eye } from 'lucide-react';
import { toast } from 'react-toastify'
import numeral from "numeral"
import { numberFormat } from '../../util/number';

const TableOrder = () => {
  const token = useEcomStore((e) => e.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrder(token);
  }, []);

  const hdlchangeOrder = async (token, orderId, orderStatus) => {
    try {
      const res = await changeOrderStatus(token, orderId, orderStatus);
      // console.log(res);
      toast.success('เปลี่ยนสถานะเรียบร้อย')
      hdlGetOrder(token)
    } catch (error) {
      console.error(error);
    }
  }

  const hdlGetOrder = async (token) => {
    try {
      const res = await getOrderAdmin(token);
      // console.log(res);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
    <div className="container mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-neutral-200">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">รายการคำสั่งซื้อ</h1>
        
        {/* Desktop View - แสดงเฉพาะบนหน้าจอใหญ่ */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-emerald-600 text-white text-center">
                <th className="p-3 border">ลำดับ</th>
                <th className="p-3 border">วันที่</th>
                <th className="p-3 border">ผู้ใช้งาน</th>
                <th className="p-3 border">สินค้า</th>
                <th className="p-3 border">รวม</th>
                <th className="p-3 border">สถานะ</th>
                <th className="p-3 border text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {Array.isArray(orders) &&
                orders
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((item, index) => (
                    <tr key={index} className="hover:bg-neutral-50 transition">
                      <td className="p-3 border">{index + 1}</td>
                      <td className="p-3 border">{new Date(item.createdAt
                      ).toLocaleString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      </td>
                      <td className="p-3 border">{item.orderBy?.email || 'ไม่ระบุ'}</td>
                      <td className="p-3 border">
                        <ul className="space-y-1">
                          {item.products?.map((product, i) => (
                            <li key={i} className="text-gray-700">
                              <span className="font-medium">{product.product.title}</span>{' '}
                              <span className="text-gray-500">x {product.count} ชิ้น</span>{' '}
                              <span className="text-emerald-600">({numberFormat(product.product.price)}฿)</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3 border text-emerald-700 font-semibold">฿{numberFormat(item.cartTotal)}</td>
                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${changeColor(item.orderStatus)}`}
                        >
                          {item.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 border text-center">
                        <select
                          value={item.orderStatus}
                          onChange={(e) => hdlchangeOrder(token, item.id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option>กำลังดำเนินการ</option>
                          <option>ไม่สำเร็จ</option>
                          <option>สำเร็จ</option>
                          <option>ยกเลิก</option>
                          <option>อยู่ระหว่างขนส่ง</option>
                        </select>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet View - Card Layout */}
        <div className="lg:hidden space-y-4">
          {Array.isArray(orders) &&
            orders
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${changeColor(item.orderStatus)}`}
                      >
                        {item.orderStatus}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-emerald-700">
                        ฿{numberFormat(item.cartTotal)}
                      </div>
                    </div>
                  </div>

                  {/* Date & User */}
                  <div className="space-y-2 mb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                      <span className="text-gray-600">วันที่:</span>
                      <span className="font-medium">
                        {new Date(item.createdAt).toLocaleString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                      <span className="text-gray-600">ผู้สั่งซื้อ:</span>
                      <span className="font-medium">{item.orderBy?.email || 'ไม่ระบุ'}</span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">สินค้า:</div>
                    <div className="space-y-1">
                      {item.products?.map((product, i) => (
                        <div key={i} className="text-sm bg-gray-50 p-2 rounded">
                          <div className="font-medium text-gray-800">{product.product.title}</div>
                          <div className="flex justify-between text-gray-600">
                            <span>จำนวน: {product.count} ชิ้น</span>
                            <span className="text-emerald-600 font-medium">
                              {numberFormat(product.product.price)}฿
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Change */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <label className="text-sm text-gray-600">เปลี่ยนสถานะ:</label>
                      <select
                        value={item.orderStatus}
                        onChange={(e) => hdlchangeOrder(token, item.id, e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option>กำลังดำเนินการ</option>
                        <option>ไม่สำเร็จ</option>
                        <option>สำเร็จ</option>
                        <option>ยกเลิก</option>
                        <option>อยู่ระหว่างขนส่ง</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* No Orders Message */}
        {Array.isArray(orders) && orders.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-lg mb-2">📋</div>
            <div>ไม่มีคำสั่งซื้อในระบบ</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOrder;
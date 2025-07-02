import { useEffect, useState } from "react"
import React from 'react'
import { listUserCart, saveAddress } from "../../api/user"
import useEcomStore from '../../store/ecom-stotr'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { numberFormat } from '../../util/number';
import { useLocation } from 'react-router-dom'
const SummartCart = () => {

  const token = useEcomStore((e) => e.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const navaigate = useNavigate()


  const location = useLocation()

  useEffect(() => {
    if (token) {
      hdlGetUserCart(token)
    }
  }, [location])



  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {

        setProducts(res.data.products)
        setCartTotal(res.data.cart)

      })
      .catch((err) => {
        console.log(err);
      })
  }


  const hdlSaveAddress = () => {
    
    if (!address) {
      return toast.warning('กรุณากรอกที่อยู่')
    }
    saveAddress(token, address)
      .then((res) => {
     
        toast.success(res.data)
        setAddressSaved(true)

      })
      .catch((err) => {
        console.log(err);

      })

  }

  const hdlPayMent = () => {
    if (!addressSaved) {
      return toast.warning('กรุณากรอกที่อยู่และกดsave')
    }
    navaigate('/user/payment')
  }




  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans text-gray-800 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ซ้าย: ที่อยู่จัดส่ง */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">ที่อยู่ในการจัดส่ง</h2>
          <textarea

            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="กรอกที่อยู่ที่นี่..."
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={hdlSaveAddress}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
            บันทึกที่อยู่
          </button>
        </div>

        {/* ขวา: สรุปคำสั่งซื้อ */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">คำสั่งซื้อ</h2>

          {/* รายการสินค้า */}

          {
            products?.map((item, index) =>
              <div key={index} className="flex  justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">จำนวน : {item.count} x {numberFormat(item.product.price)}</p>
                </div>
                <div className="text-red-600 font-semibold">{numberFormat(item.count * item.product.price)}</div>
              </div>
            )
          }




          {/* ค่าจัดส่ง / ส่วนลด */}
          <div className="flex justify-between text-sm">
            <span>ค่าจัดส่ง</span>
            <span>฿0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>ส่วนลด</span>
            <span>฿0.00</span>
          </div>

          {/* ยอดรวม */}
          <div className="flex justify-between pt-3 border-t text-base font-semibold">
            <span>ยอดรวม</span>
            <span>฿{numberFormat(cartTotal)}</span>

          </div>
          <hr />
          <div>
            <button
              onClick={hdlPayMent}
              // disabled={!addressSaved}
              className='bg-emerald-500 w-full p-2 border rounded-lg shadow-md text-white  hover:bg-emerald-600 transition'>ดำเนินการชำระเงิน</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummartCart

import React from 'react'
import { ListChecks, Trash2 } from 'lucide-react'
import useEcomStore from '../../store/ecom-stotr'
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user'
import { toast } from 'react-toastify'
import { numberFormat } from '../../util/number';
const ListCart = () => {
    const cart = useEcomStore((e) => e.carts)
    const user = useEcomStore((e) => e.user)
    const token = useEcomStore((e) => e.token)
    const getTotal = () => cart.reduce((total, item) => total + item.price * item.count, 0)
    const actionRemove = useEcomStore((state) => state.actionRemove)
    const navigate = useNavigate()
    


    const handleSaveCart = async () => {
        if (cart.length <1) {
            toast.warning("รถเข็นของคุณว่างเปล่า");
            return;
        }

        try {
            const res = await createUserCart(token, { cart });
            toast.success("บันทึกรถเข็นเรียบร้อย");
            navigate('/checkout');
        } catch (err) {
            console.log(err);
            toast.warning(err.response?.data?.message || "เกิดข้อผิดพลาด");
        }
    };

    // const handleSaveCart = async () => {

    //     // การใส่{}จะทำให้เป็ฯobject จากตอนแรกเป็นอาเรย์
    //     await createUserCart(token, { cart })
    //         .then((res) => {
    //             console.log(res);
    //             toast.success(" เรียบร้อย")
    //             navigate('/checkout')
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             toast.warning(err.response.data.message)

    //         })

    // }

    return (
        <div className="min-h-screen p-6 bg-gray-50 font-sans text-gray-800">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <ListChecks size={28} className="text-emerald-500" />
                <h1 className="text-2xl font-semibold">รายการสินค้า</h1>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: List */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between gap-4">
                            {/* image */}
                            {item.images?.length > 0 ? (
                                <img src={item.images[0].url} className="w-16 h-16 object-cover rounded-md border" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md text-sm text-gray-500">
                                    no image
                                </div>
                            )}

                            {/* title + qty */}
                            <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">฿{numberFormat(item.price)} × {item.count}</p>
                            </div>

                            {/* price */}
                            <div className="text-emerald-600 font-bold whitespace-nowrap">
                                ฿{numberFormat(item.price * item.count)}
                            </div>

                            {/* delete */}
                            <button
                                onClick={() => actionRemove(item.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 h-fit">
                    <h2 className="text-lg font-semibold border-b pb-2">ยอดรวม</h2>

                    <div className="flex justify-between items-center text-base">
                        <span>รวมสุทธิ</span>
                        <span className="font-bold text-emerald-600">฿{numberFormat(getTotal())}</span>
                    </div>


                    {/* ถ้าflexเฉยๆจะอยู่้บรรทัดเดัยวกัน flex-colจะอยู๋คนละบรรทัด */}
                    <div className='flex flex-col gap-2'>


                        {
                            user
                                ?
                                <button
                                    onClick={handleSaveCart}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition"
                                >
                                    ดำเนินการชำระเงิน
                                </button>

                                : <Link to="/Login">
                                    <button className="w-full bg-blue-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition">
                                        Login
                                    </button>
                                </Link>
                        }





                        <Link to="/Shop">
                            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition">
                                แก้ไขรายการ
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ListCart

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/ecom-stotr'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((e) => e.actionLogin)
  const user = useEcomStore((e) => e.user)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role

      // ✅ หน่วงเวลา 1 วินาทีก่อน redirect
      setTimeout(() => {
        roleReadirect(role)
        toast.success(`Welcome 👋`)
      }, 1000)
    } catch (error) {
      const errMsg = error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
      toast.error(errMsg)
      setLoading(false)
    }
  }

  const roleReadirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
    setLoading(false) // ✅ ปิด loading หลัง navigate
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-white p-4">
      <div className="bg-white w-full max-w-md shadow-lg rounded-xl p-8 space-y-6 border border-neutral-200">
        <h2 className="text-2xl font-bold text-center text-emerald-600">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden px-3 py-2">
            <Mail className="text-neutral-400 mr-2" size={18} />
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              className="w-full focus:outline-none"
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden px-3 py-2">
            <Lock className="text-neutral-400 mr-2" size={18} />
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              className="w-full focus:outline-none"
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white font-medium py-2 rounded-lg transition flex justify-center items-center`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : null}
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

        </form>

        <p className="text-center text-sm text-neutral-500">
          ยังไม่มีบัญชี? <a href="/register" className="text-emerald-600 hover:underline">สมัครสมาชิก</a>
        </p>
      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/ecom-stotr'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((e) => e.actionLogin)
  const user = useEcomStore((e) => e.user)

  const [form, setForm] = useState({ email: '', password: '' })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleReadirect(role)
      toast.success(`Welcome 👋`)
    } catch (error) {
      const errMsg = error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
      toast.error(errMsg)
    }
  }

  const roleReadirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
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
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition"
          >
            เข้าสู่ระบบ
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

import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'กรุณาใส่อีเมลให้ถูกต้อง' }),
  password: z
    .string()
    .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['confirmPassword'],
})

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post('https://ecom-eight-brown.vercel.app/api/register', formData)
      toast.success(res.data)
      console.log(res)
    } catch (err) {
      const errMsg = err.response?.data?.message || 'เกิดข้อผิดพลาด'
      toast.error(errMsg)
      console.log(err)
    }
  }

  // สำหรับแสดงความแข็งแรงรหัสผ่าน
  const password = watch('password') || ''
  const strength = zxcvbn(password).score

  const strengthLabel = ['อ่อนมาก', 'อ่อน', 'พอใช้', 'ดี', 'แข็งแรง'][strength]

  return (
    <div className="max-w-md mx-auto mt-40 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">สมัครสมาชิก</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">อีเมล</label>
          <input
            type="email"
            className="border w-full p-2 rounded"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">รหัสผ่าน</label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            {...register('password')}
          />
          {password && (
            <p className="text-sm mt-1">
              ความแข็งแรงรหัสผ่าน: <span className="font-bold">{strengthLabel}</span>
            </p>
          )}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          สมัครสมาชิก
        </button>
      </form>
    </div>
  )
}

export default Register

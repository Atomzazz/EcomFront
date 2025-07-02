import React, { useState, useEffect } from 'react'
import { getListUser, changeStatusUser, changeRoleUser } from '../../api/admin'
import useEcomStore from '../../store/ecom-stotr'
import { toast } from 'react-toastify'
import { Users, Shield, UserCheck, UserX, Settings } from 'lucide-react'

const TableUser = () => {
  const token = useEcomStore((e) => e.token)
  const [user, setUsers] = useState([])

  useEffect(() => {
    hdlGetUser(token)
  }, [])

  const hdlGetUser = (token) => {
    getListUser(token)
      .then((res) => setUsers(res.data))
      .catch(err => console.log(err))
  }

  const hdlChangeStatusUser = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus
    }
    changeStatusUser(token, value)
      .then(() => {
        hdlGetUser(token)
        toast.success('เปลี่ยนสถานะเรียบร้อย')
      })
      .catch(err => console.log(err))
  }

  const hdlChangeRoleUser = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole
    }
    changeRoleUser(token, value)
      .then(() => {
        hdlGetUser(token)
        toast.success('เปลี่ยนสิทธิ์เรียบร้อย')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-neutral-200">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <Users className="text-emerald-600" size={24} />
          รายชื่อผู้ใช้ ({user.length} คน)
        </h1>

        {/* Desktop Table View */}
        <div className="hidden lg:block w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-emerald-600 text-white text-center">
                <th className="py-3 px-4 border">ลำดับ</th>
                <th className="py-3 px-4 border">อีเมล</th>
                <th className="py-3 px-4 border">สิทธิ์</th>
                <th className="py-3 px-4 border">สถานะ</th>
                <th className="py-3 px-4 border">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border text-center">{index + 1}</td>
                  <td className="py-3 px-4 border text-left">{item.email}</td>
                  <td className="py-3 px-4 border text-center">
                    <select
                      onChange={(e) => hdlChangeRoleUser(item.id, e.target.value)}
                      value={item.role}
                      className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1
                      ${item.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.enabled ? <UserCheck size={14} /> : <UserX size={14} />}
                      {item.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <button
                      onClick={() => hdlChangeStatusUser(item.id, item.enabled)}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition inline-flex items-center gap-1
                        ${item.enabled ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
                    >
                      {item.enabled ? <UserX size={14} /> : <UserCheck size={14} />}
                      {item.enabled ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {user?.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded font-medium">
                    #{index + 1}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
                    ${item.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.enabled ? <UserCheck size={12} /> : <UserX size={12} />}
                    {item.enabled ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield size={14} className={item.role === 'admin' ? 'text-orange-500' : 'text-gray-400'} />
                  <span className={`text-xs font-medium ${item.role === 'admin' ? 'text-orange-600' : 'text-gray-600'}`}>
                    {item.role.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">อีเมล:</div>
                <div className="font-medium text-gray-800 break-all">{item.email}</div>
              </div>

              {/* Controls */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                {/* Role Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    <Settings size={14} />
                    เปลี่ยนสิทธิ์:
                  </label>
                  <select
                    onChange={(e) => hdlChangeRoleUser(item.id, e.target.value)}
                    value={item.role}
                    className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Status Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <label className="text-sm text-gray-600">สถานะบัญชี:</label>
                  <button
                    onClick={() => hdlChangeStatusUser(item.id, item.enabled)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition inline-flex items-center justify-center gap-2 sm:w-auto w-full
                      ${item.enabled ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
                  >
                    {item.enabled ? <UserX size={16} /> : <UserCheck size={16} />}
                    {item.enabled ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Users Message */}
        {user.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <div className="text-lg mb-2">ไม่มีผู้ใช้ในระบบ</div>
            <div className="text-sm">รอผู้ใช้สมัครสมาชิกเข้าสู่ระบบ</div>
          </div>
        )}

        {/* Summary Stats */}
        {user.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{user.length}</div>
                <div className="text-sm text-blue-800">ผู้ใช้ทั้งหมด</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  {user.filter(u => u.enabled).length}
                </div>
                <div className="text-sm text-green-800">ใช้งานอยู่</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">
                  {user.filter(u => !u.enabled).length}
                </div>
                <div className="text-sm text-red-800">ปิดใช้งาน</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-600">
                  {user.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-sm text-orange-800">ผู้ดูแลระบบ</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TableUser
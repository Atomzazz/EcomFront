import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, Boxes,
  ListOrdered, LogOut, ImageDown, X
} from 'lucide-react'
import useEcomStore from '../../store/ecom-stotr'
import HeaderAdmin from './HeaderAdmin'

const SidebarAdmin = () => {
  const navigate = useNavigate()
  const setUser = useEcomStore((e) => e.setUser)
  const setToken = useEcomStore((e) => e.setToken)
  const [isOpen, setIsOpen] = useState(false) // สำหรับ Drawer mobile

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    navigate('/Login')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition duration-200 ${isActive ? 'bg-emerald-600 text-white' : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
    }`



  const SidebarContent = ({ handleLogout, linkClass }) => (
    <>
      <div className="h-20 flex items-center justify-center border-b border-neutral-700">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        <NavLink to="/admin" end className={linkClass}><LayoutDashboard size={18} />Dashboard</NavLink>
        <NavLink to="Manage" className={linkClass}><ListOrdered size={18} />Manage</NavLink>
        <NavLink to="Category" className={linkClass}><Boxes size={18} />Category</NavLink>
        <NavLink to="Product" className={linkClass}><ShoppingBag size={18} />Product</NavLink>
        <NavLink to="ManageOrder" className={linkClass}><ListOrdered size={18} />Orders</NavLink>
        <NavLink to="ManageHome" className={linkClass}><ImageDown size={18} />Image main</NavLink>
      </nav>

      <footer className="p-4 border-t border-neutral-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-white hover:bg-red-600 px-4 py-2 rounded-md transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </footer>
    </>
  )

  return (
    <>
      {/* ✅ Header ที่มีปุ่มแฮมเบอร์เกอร์ */}
      <div className="xl:hidden fixed top-0 left-0 w-full z-40">
        <HeaderAdmin onMenuClick={() => setIsOpen(true)} />
      </div>

      {/* ✅ Sidebar ปกติ (คอม) */}
      <div className="hidden xl:flex w-64 bg-neutral-800 text-white flex-col h-screen shadow-lg">
        <SidebarContent handleLogout={handleLogout} linkClass={linkClass} />
      </div>

      {/* ✅ Drawer Sidebar มือถือ / iPad */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="w-64 bg-neutral-800 text-white h-full shadow-lg p-4 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
              <X />
            </button>
            <SidebarContent handleLogout={handleLogout} linkClass={linkClass} />
          </div>
        </div>
      )}
    </>
  )
}



export default SidebarAdmin

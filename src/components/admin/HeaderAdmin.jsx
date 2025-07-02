import React from 'react'
import { Menu } from 'lucide-react'

const HeaderAdmin = ({ onMenuClick }) => {
  return (
     <header className="bg-slate-500 h-14 px-4 flex items-center shadow-md xl:hidden">
      {/* Hamburger icon */}
      <button onClick={onMenuClick} className="text-gray-800">
        <Menu size={24} />
      </button>

      {/* ระบบหรือโลโก้ */}
      <h1 className="text-xl pl-4 font-bold text-white">Admin Panel</h1>

      {/* Spacer ขวา */}
      <div style={{ width: 24 }} />
    </header>
  )
}

export default HeaderAdmin

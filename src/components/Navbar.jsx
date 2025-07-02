// ใส่ไว้ใน Navbar.jsx แทนของเดิม (สั้นลง + Responsive ครบ)
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Home, ShoppingBag, Clock } from 'lucide-react'
import useEcomStore from '../store/ecom-stotr'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const carts = useEcomStore((e) => e.carts)
  const user = useEcomStore((e) => e.user)
  const setUser = useEcomStore((e) => e.setUser)
  const setToken = useEcomStore((e) => e.setToken)

  const totalItemCount = carts.reduce((total, item) => total + item.count, 0)
 
  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    navigate('/Login')
  }

  return (
    <>
      {/* ✅ Top bar */}
      <header className="fixed top-0 left-0 w-full bg-emerald-600 text-white z-50 shadow-md ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          {/* โลโก้ + เมนู */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-3xl font-bold tracking-wide">LOGO</Link>
            <nav className="hidden md:flex gap-6 text-lg font-medium">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Shop">Shop</NavLink>
              {user && <NavLink to="/user/History">History</NavLink>}
            </nav>
          </div>

          {/* Cart + Auth */}
          <div className="flex items-center gap-4">



            {user ? (

              // group hidden lg:block	ซ่อนทั้งหมด ยกเว้น lg ขึ้นไปจึงแสดง
              <><Link to="/Cart" className="relative group hidden lg:block  ">
                <ShoppingCart size={22} />
                {carts.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {totalItemCount}
                  </span>
                )}
              </Link>
                <span className="text-sm">👋 {user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-emerald-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/Register" className="text-sm hover:underline">Register</Link>
                <Link to="/Login" className="bg-white text-emerald-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around text-sm z-50 py-2   shadow-inner">
        <BottomNavLink to="/" icon={<Home size={20} />}>Home</BottomNavLink>
        <BottomNavLink to="/Shop" icon={<ShoppingBag size={20} />}>Shop</BottomNavLink>
        {user && <BottomNavLink to="/user/History" icon={<Clock size={20} />}>History</BottomNavLink>}
      </nav>

      {/* Spacer */}
    </>
  )
}

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation()
  const isActive = pathname === to
  return (
    <Link
      to={to}
      className={`hover:text-emerald-200 transition ${isActive ? 'underline underline-offset-4 text-white font-semibold' : ''
        }`}
    >
      {children}
    </Link>
  )
}

const BottomNavLink = ({ to, children, icon }) => {
  const { pathname } = useLocation()
  const isActive = pathname === to
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}
    >
      {icon}
      {children}
    </Link>
  )
}

export default Navbar

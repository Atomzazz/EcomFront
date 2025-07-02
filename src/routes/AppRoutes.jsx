import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/shop'
import Cart from '../pages/Cart'
import History from '../pages/user/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Product from '../pages/admin/Product'
import Category from '../pages/admin/Category'
import Manage from '../pages/admin/Manage'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import ProtecUser from './ProtecUser'
import ProtecAdmin from './ProtecAdmin'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import ManageOrder from '../pages/admin/ManageOrder'
import ManageHomeImages from '../components/home/ManageHome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Shop', element: <Shop /> },
      { path: 'Cart', element: <Cart /> },

      { path: 'Checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'Register', element: <Register /> },
    ]
  }, {
    path: '/admin',
    element: <ProtecAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'Category', element: <Category /> },
      { path: 'Product', element: <Product /> },
      { path: 'Product/:id', element: <EditProduct /> },
      { path: 'Manage', element: <Manage /> },
      { path: 'ManageOrder', element: <ManageOrder /> },
      { path: 'ManageHome', element: <ManageHomeImages /> },


    ]
  }, {
    path: '/user',
    // element : <LayoutUser/>,
    element: <ProtecUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'payment', element: <Payment /> },
      { path: 'History', element: <History /> },


    ]
  }


])

const AppRoutes = () => {
  return (
    <><RouterProvider router={router} /></>
  )
}

export default AppRoutes
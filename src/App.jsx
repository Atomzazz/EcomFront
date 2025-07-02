import React from 'react'
import AppRoutes from './routes/AppRoutes'

import { ToastContainer } from 'react-toastify';
//rafce ไว้ใช้import react
const App = () => {


  return (
    <>
      <div >
        <ToastContainer />
        <AppRoutes />
      </div>
    </>

  )
}

export default App
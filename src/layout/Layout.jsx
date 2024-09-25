import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div className='w-[100%] h-[50px]'>

      </div>
      <Outlet/>
    </div>
  )
}

export default Layout

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import ManagerSidebar from './ManagerSidebar'

const ManagerOutlet = () => {
  return (
    <div className='flex flex-col h-auto'>
    <div>
      <Header />
    </div>
    <div className='flex  bg-purple-100 h-auto'>
      <div className='md:flex hidden w-[25%]'>
        <ManagerSidebar />
      </div>
      <div className='w-full md:w-[85%]  h-full'>
        <div className='bg-purple-100  flex justify-center items-center h-screen'>
          <div className='w-[100%] h-[100%] flex flex-col gap-10 bg-purple-100 overflow-y-auto overflow-hidden  '> <Outlet /></div>

        </div>

      </div>
    </div>

  </div>
  )
}

export default ManagerOutlet
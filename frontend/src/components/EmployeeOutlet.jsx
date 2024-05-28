import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import EmployeeSidebar from './EmployeeSidebar'
import HeaderEmployee from './HeaderEmployee'

const EmployeeOutlet = () => {
  return (
    <div className='flex flex-col h-auto'>
      <div>
        <HeaderEmployee />
      </div>
      <div className='flex  bg-purple-50 h-auto'>
        <div className='lg:flex w-[25%] hidden'>
          <EmployeeSidebar />
        </div>
        <div className='lg:w-[85%] w-full  h-full'>
          <div className='bg-purple-100  flex lg:justify-center lg:items-center h-screen'>
            <div className='w-[100%] h-[100%] flex flex-col gap-10 bg-purple-100 overflow-y-auto overflow-hidden '> <Outlet /></div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default EmployeeOutlet
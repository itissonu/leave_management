import React, { useEffect } from 'react'
import img from '../assets/login.png'
import { FaTelegramPlane } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { GetLeaveForEmployee } from '../redux/slice/leaveSlice';
import toast, { Toaster } from 'react-hot-toast';
import { HiStatusOnline } from "react-icons/hi";
import { IoArrowDownOutline } from "react-icons/io5";

const EmployeHome = () => {
  const dispatch = useDispatch();
  const { leaveRequests, loading, error, message, } = useSelector((state) => state.leave);
  const user = useSelector((state) => state?.auth?.user);

  const totalLeaves = user?.leaveBalances?.reduce((totals, leave) => {
    totals.totalGiven += leave.leaveType.maxAllowedDays;
    totals.totalBalance += leave.balance;
    return totals;
  }, { totalGiven: 0, totalBalance: 0 });

  console.log(`Total leave given: ${totalLeaves.totalGiven}`);
  console.log(`Total leave balance: ${totalLeaves.totalBalance}`);

  useEffect(() => {
    if (user) {

      dispatch(GetLeaveForEmployee(user._id));

    }
  }, [dispatch, user, message]);

  const percentage = (totalLeaves?.totalBalance / totalLeaves?.totalGiven) * 100;


  return (
    <div className='md:px-10 px-2 bg-purple-100 w-full'>

      <div className='md:px-12 w-full h-60 bg-black rounded-2xl shadow-md mt-10 flex flex-row justify-end relative '>
        <div className='md:w-[80%] w-full lg:w-1/2 flex flex-col justify-center'>
          <div className='w-full flex flex-col gap-2 h-max items-center '>
            <span className='text-white font-inter text-xl text-start w-full flex px-5'>Total leave</span>
            <div className='flex w-full  items-center gap-8 px-6'>
              <div className='h-1 w-[70%] bg-white rounded-3xl flex  '>
                <span className='h-1  bg-yellow-500 flex' style={{ width: `${Math.floor(percentage)}%` }}></span>

              </div>
              <span className='text-yellow-400 font-mono text-5xl font-bold'>{totalLeaves?.totalBalance}</span>
            </div>
            <div className='flex w-full gap-10 px-5'>
              <div className='flex flex-col gap-1'>
                <span className='text-sm text-gray-500 font-semibold opacity-85'> Leave I got</span>
                <span className='text-2xl text-center text-white opacity-85'>{totalLeaves?.totalGiven}</span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm text-gray-500  font-semibold opacity-85'> Leave I have</span>
                <span className='text-2xl text-center text-white opacity-85'>{totalLeaves?.totalBalance}</span>
              </div>
            </div>
            <span className='mt-5 border-b-white border-b-[1px] flex w-[90%] opacity-10 justify-start'></span>

          </div>

        </div>
        <div className='absolute bottom-[-140px]  left-8 p-4 flex flex-col md:flex-row gap-3 items-center '>
          <div className='size-max  border-green-700 border-2 rounded-full'>
            <img src={user?.profilePicture} className='lg:size-40 size-28 rounded-full ' />
          </div>
          <div className='flex flex-col md:gap-2 '>
            <span className='font-Montserrat font-semibold md:text-4xl text-lg capitalize'>{user?.name}</span>
            <span className='font-inter text-gray-600 lg:text-base text-sm opacity-85 '>software developer</span>
          </div>
        </div>
      </div>
      <div className='lg:mt-36 mt-28 lg:px-28 flex lg:flex-row flex-col gap-10 py-11 w-full'>
        <div className='h-96 lg:w-[40%] w-full p-4 bg-white shadow-md rounded-lg flex gap-5 flex-col'>
          <h3 className='text-xl font-bold font-Montserrat '>
            personal information
          </h3>
          <div className='flex w-full flex-col '>
            <div className='flex p-3 justify-between'>
              <span className='text-gray-500'>Status</span>
              <span className='text-sm font-inter flex items-center gap-2 font-semibold text-gray-900 capitalize'><HiStatusOnline className='size-5 text-green-400'/>{user?.status}</span>
            </div>
            <div className='flex p-3 justify-between'>
              <span className='text-gray-500'>Name</span>
              <span className='text-sm font-inter font-semibold capitalize text-gray-900'>{user?.name}</span>
            </div>
            <div className='flex p-3 justify-between'>
              <span className='text-gray-500'>email</span>
              <span className='text-sm font-inter font-semibold text-gray-900'>{user?.email}</span>
            </div>
            <div className='flex p-3 justify-between'>
              <span className='text-gray-500'>Phone</span>
              <span className='text-sm font-inter font-semibold text-gray-900'>{user?.phone}</span>
            </div>
            <div className='flex p-3 justify-between'>
              <span className='text-gray-500'>Leave Remained</span>
              <span className='text-sm font-inter flex items-center gap-1 font-semibold text-gray-900'>{totalLeaves?.totalBalance}<IoArrowDownOutline className='size-5 text-red-600' /></span>
            </div>

          </div>

        </div>
        <div className='h-56 w-full lg:w-[40%] bg-white shadow-md rounded-md flex-col flex gap-10 p-4'>
          <h3 className='text-xl font-bold font-Montserrat mt-2'>
            contact information
          </h3>
          <div className='flex gap-3 flex-col w-full items-center justify-center'>

            <div className=' w-[92%] h-12 bg-[#d5d5e4] rounded-xl flex justify-between items-center p-2 gap-2'>
              <div className='w-full flex items-center gap-2 '>
                <span className=' size-max rounded-full p-2 bg-blue-950 flex '><FaTelegramPlane className='text-white' /></span><span className='text-xs font-inter font-semibold'>Telegram</span>
              </div>
              <span className='text-xs font-semibold'>@{user?.name.split(' ')[0]}</span>

            </div>

            <div className=' w-[92%] h-12 bg-[#d5d5e4] rounded-xl flex justify-between items-center p-2 gap-2'>
              <div className='w-full flex items-center gap-2 '>
                <span className=' size-max rounded-full p-2 bg-blue-950 flex '><FaPhoneAlt className='text-white' /></span><span className='text-xs font-inter font-semibold'>Telephone</span>
              </div>
              <span className='text-xs'>{user?.phone}</span>

            </div>
          </div>
        </div>

      </div>



    </div>
  )
}

export default EmployeHome
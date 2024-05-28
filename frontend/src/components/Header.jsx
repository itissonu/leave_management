import React from 'react'
import TemporaryDrawer from '../utils/TemporaryDrawyer';
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import TemporaryDrawerEmployee from '../utils/TemoraryDrawyerEmployee';
import { CiMenuBurger } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [openDrawer, setOpenDrawer] = React.useState(false);
const navigate=useNavigate()
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <div className='navbar bg-black justify-between  w-full flex gap-4 items-center text-white p-2 z-50 '>
      {openDrawer && <TemporaryDrawerEmployee openDrawer={openDrawer} toggleDrawer={toggleDrawer} setOpenDrawer={setOpenDrawer} />}
      <div className='flex justify-between items-center gap-1'>
        <span><CiMenuBurger className='text-white  mx-[4px] h-6 w-6 lg:hidden hover:cursor-pointer' onClick={toggleDrawer(true)} /></span>
        <span className='font-bold font-Shadows text-3xl hover:cursor-pointer' onClick={()=>navigate('/manager/home')}>LeavePro.</span>
      </div>
      <div className='flex items-center gap-3'>
        <img src={user?.profilePicture} className='size-10 rounded-full' />
        <span className='hidden font-inter md:flex'>profile</span>
      </div>

    </div>
  )
}

export default Header
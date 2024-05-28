import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { IoMdExit } from 'react-icons/io';

export default function TemporaryDrawerManager({ toggleDrawer, openDrawer, setOpenDrawer }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LogoutUser());
        navigate('/');
    };
    const handleNavigation = (path) => {
        navigate(path);
        setOpenDrawer(false);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <div className='flex flex-col justify-between h-[100vh]'>
                <div className='flex flex-col mx-2'>
                    <span onClick={() => handleNavigation('/manager/home')} className='text-2xl border-b-[1px] hover:cursor-pointer font-Shadows mt-4 shadow-md border-b-slate-300 font-bold p-2'>LeavePro.</span>
                    <span onClick={() => handleNavigation('/manager/home')} className='text-base text-gray-500 font-bold m-2'>Home</span>
                    <span onClick={() => handleNavigation('/manager/leaverequests/0')} className='text-base text-gray-500 font-bold m-2'>All Requset</span>

                </div>
                <button className='flex items-center w-full gap-2 mb-5 mx-4' onClick={handleLogout}>
                    <IoMdExit size={24} />
                    Sign Out
                </button>
                
            </div>
        </Box>
    );

    return (
        <div>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

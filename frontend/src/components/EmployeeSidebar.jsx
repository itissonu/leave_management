import React from 'react';
import { IoMdExit } from "react-icons/io";
import { IoHomeOutline, IoChatbubblesOutline, IoSchool } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutUser } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { VscRequestChanges } from "react-icons/vsc";
import { BiDetail } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa6";

const EmployeeSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(LogoutUser());
        navigate('/');
    };

    return (
        <div className='w-full bg-purple-100 justify-center flex'>
            <div className='h-[50%] w-[70%] flex flex-col justify-between gap-2 mt-11 bg-white pt-4 shadow-lg rounded-md'>
                <div className='w-full flex flex-col justify-between  font-semibold items-center gap-2'>
                    <button onClick={() => { navigate("/employee/home") }} className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out rounded-lg h-10 items-center ${location?.pathname === "/employee/home" ? "bg-blue-200 font-bold shadow-md scale-100 duration-300 ease-in-out" : ""}`}>
                        <IoHomeOutline size={22} />
                        Home
                    </button>
                    <button onClick={() => { navigate("/employee/leaverequest") }} className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out rounded-lg h-10 items-center ${location?.pathname === "/employee/leaverequest" ? "bg-blue-200 font-bold shadow-md scale-100 duration-300 ease-in-out" : ""}`}>
                        <VscRequestChanges size={22} />
                        Leave Request
                    </button>
                    <button onClick={() => { navigate("/employee/leaves") }} className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out rounded-lg h-10 items-center ${location?.pathname === "/employee/leaves" ? "bg-blue-200 font-bold shadow-md scale-100 duration-300 ease-in-out" : ""}`}>
                        <BiDetail size={22} />
                        Leave Details
                    </button>
                    <button onClick={() => { navigate("/employee/Calander") }} className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out rounded-lg h-10 items-center ${location?.pathname === "/employee/Calander" ? "bg-blue-200 font-bold shadow-md scale-100 duration-300 ease-in-out" : ""}`}>
                        <FaRegCalendar size={22} />
                        Calendar
                    </button>
                </div>
                <div className='w-full pl-7  m-2 font-semibold'>
                    <button className='flex items-center w-full gap-2' onClick={handleLogout}>
                        <IoMdExit size={24} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeSidebar;

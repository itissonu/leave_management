import React from 'react'
import { GrArticle } from "react-icons/gr";
import { IoMdExit } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { CiVideoOn, CiBellOn } from "react-icons/ci";
import { ImBlogger2 } from "react-icons/im";
import { useLocation, useNavigate } from 'react-router-dom';
import { TbDeviceComputerCamera } from "react-icons/tb";
import { LogoutUser } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';


const ManagerSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(LogoutUser());
        navigate('/');
    };
    const leaveRequestPaths = [
        "/manager/leaverequests/0",
        "/manager/leaverequests/1",
        "/manager/leaverequests/2",
        "/manager/leaverequests/3"
    ];
    return (
        <div className='w-full bg-purple-100 justify-center flex'>
            <div className='h-[50%] w-[70%] flex flex-col gap-2 mt-11 bg-white pt-4 shadow-lg rounded-md'>

                <div className='w-full flex flex-col justify-center  font-semibold items-center gap-2 '>
                    <button onClick={() => { navigate("/manager") }} className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-100 ease-in-out rounded-lg h-10 items-center ${location?.pathname === "/manager" ? "bg-blue-200 font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <IoHomeOutline size={22} />
                        Home</button>
                    <button
                        onClick={() => { navigate("/manager/leaverequests/0") }}
                        className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-100 ease-in-out rounded-lg h-10 items-center ${leaveRequestPaths.includes(location?.pathname) ? "bg-blue-200 font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}
                    >
                        <IoChatbubblesOutline size={22} />
                        Leave Requests
                    </button>
                    {/* <button onClick={() => { navigate("/student/compiler") }} className={`flex w-[90%] gap-4 px-4 hover:bg-blue-100 hover:font-bold hover:shadow-md hover:scale-100 duration-300 ease-in-out   rounded-lg h-10 items-center ${location?.pathname === "/compiler" ? "bg-white font-bold shadow-md scale-100 duration-300 ease-in-out " : ""}`}>
                        <FaBook size={22} />
                        Single User</button> */}


                </div>
                <div className='w-full pl-5 font-semibold'>
                    <button className='flex items-center w-full   gap-2' onClick={handleLogout} > <IoMdExit size={24} />signout</button>

                </div>



            </div>

        </div>
    )
}

export default ManagerSidebar
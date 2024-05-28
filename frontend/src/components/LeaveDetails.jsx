import React, { useEffect, useState } from 'react';
import img1 from '../assets/desktop.png';
import { useDispatch, useSelector } from 'react-redux';
import { GetLeaveForEmployee } from '../redux/slice/leaveSlice';
import { MdOutlinePendingActions } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FcApproval } from "react-icons/fc";
import { MdArrowDropDown } from "react-icons/md";
import { GiPerpendicularRings } from "react-icons/gi";

const LeaveDetails = () => {
    const dispatch = useDispatch();
    const { leaveRequests, loading, error, message } = useSelector((state) => state.leave);
    const user = useSelector((state) => state?.auth?.user);
    console.log(leaveRequests);

    useEffect(() => {
        if (user) {
            dispatch(GetLeaveForEmployee(user._id));
        }
    }, [dispatch, user]);

    return (
        <div>
            <div className='w-full h-60 mt-10 flex flex-row relative'>
                <img src={img1} className='h-full px-1 w-full lg:w-[80%]' />
                <span className='lg:text-4xl absolute top-[50%] left-20 text-white font-inter font-bold'> Vacations </span>
            </div>
            <div className='lg:w-[85%] px-3 w-full lg:px-32 flex flex-col gap-5 mt-5'>

                {leaveRequests?.length === 0 ? <>No datat to show</> : leaveRequests?.map((leaveRequest, index) => (
                    <LeaveRequestItem key={index} leaveRequest={leaveRequest} />
                ))}
            </div>
        </div>
    );
}

const LeaveRequestItem = ({ leaveRequest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='border border-gray-200 bg-white rounded-md p-4'>
            <div className='flex flex-col gap-2'>
                <div className='text-lg font-inter items-center font-bold flex gap-2'>
                    {leaveRequest?.status === 'pending' && <span className='bg-blue-900 rounded-full  size-max p-1 flex '><GiPerpendicularRings className='text-white size-3' /></span>}
                    {leaveRequest?.status === 'rejected' && <span className='bg-red-700 size-max rounded-full p-1 flex '><RxCross1 className='text-white font-semibold size-3' /></span>}
                    {leaveRequest?.status === 'approved' && <span className=' size-max rounded-full p-1 flex '><FcApproval /></span>}<span className='capitalize'>{leaveRequest.status}</span>
                </div>

                <div className='flex  justify-between'>
                    <div className='flex gap-10 text-gray-600 font-inter text-sm opacity-75'>
                        <h3>{leaveRequest?.leaveType.name}</h3>
                        <p>{new Date(leaveRequest.startDate).toLocaleDateString()} - {new Date(leaveRequest.endDate).toLocaleDateString()}</p>
                    </div>

                    <button onClick={toggleDropdown}><MdArrowDropDown className='size-8' /></button>
                </div>

            </div>
            {isOpen && (
                <div className='mt-4'>
                    <p><strong>Reason:</strong> {leaveRequest?.reason}</p>
                    <p><strong>Status:</strong> {leaveRequest?.status}</p>
                    {leaveRequest?.managerComments && <p><strong>Message:</strong> {leaveRequest?.managerComments}</p>}

                </div>
            )}
        </div>
    );
};

export default LeaveDetails;

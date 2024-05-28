import React, { useEffect, useState } from 'react'
import img1 from '../assets/calander.png';
import { GetAbsentDates, GetLeaveForEmployee } from '../redux/slice/leaveSlice';
import { useDispatch, useSelector } from 'react-redux';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { MdArrowDropDown } from 'react-icons/md';
import { FcApproval } from 'react-icons/fc';
import Loader from './Loader';
const AbsentDaysUser = () => {
    const dispatch = useDispatch();
    const { leaveRequests, loading, error, message, absentdays } = useSelector((state) => state.leave);
    const user = useSelector((state) => state?.auth?.user);
    console.log(leaveRequests);
    const approvedRequests = leaveRequests.filter(
        (leaveRequest) => leaveRequest.status === 'approved'
    );
    useEffect(() => {
        if (user) {
            dispatch(GetLeaveForEmployee(user._id));
            dispatch(GetAbsentDates(user._id))
        }
    }, [dispatch, user]);


    const data = absentdays

    return (
        <div>
        {loading&& <Loader/>}
            <div className='w-full h-60 mt-10 flex flex-row relative'>
                <img src={img1} className='h-full w-full px-1 lg:w-[80%]' />
                <span className='lg:text-4xl absolute top-[50%] left-20 text-white font-inter font-bold'> Absent Days </span>
            </div>
            <div className='md:flex-row flex-col flex gap-3 w-full mt-5 mb-4'>
                <div className='lg:w-1/2 px-2 w-full  bg-white p-2'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        events={absentdays}
                        eventBorderColor='black'
                        eventBackgroundColor='yellow'
                        eventTextColor='black'
                        height={700}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    {loading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            {approvedRequests.length === 0 ? (
                                <>No approved leave requests</>
                            ) : (
                                approvedRequests.map((leaveRequest, index) => (
                                    <LeaveRequestItem key={index} leaveRequest={leaveRequest} />
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>


        </div>
    )
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

                    <span className=' size-max rounded-full p-1 flex '><FcApproval /></span><span className='capitalize'>{leaveRequest.status}</span>
                </div>

                <div className='flex  justify-between'>
                    <div className='flex gap-10 text-gray-600 font-inter text-sm opacity-75'>
                        <h3>{leaveRequest?.leaveType?.name}</h3>
                        <p>{new Date(leaveRequest?.startDate).toLocaleDateString()} - {new Date(leaveRequest?.endDate).toLocaleDateString()}</p>
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

export default AbsentDaysUser

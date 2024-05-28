import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FcApproval } from 'react-icons/fc';
import { GiPerpendicularRings } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { GetAUser } from '../redux/slice/authSlice';
import { GetAbsentDates, GetLeaveForEmployee } from '../redux/slice/leaveSlice';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { MdArrowDropDown } from 'react-icons/md';


const SingleUser = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { leaveRequests, absentdays, loading } = useSelector((state) => state.leave);
  const { singleuser, user } = useSelector((state) => state?.auth);

  const totalLeaves = singleuser?.leaveBalances?.reduce((totals, leave) => {
    totals.totalGiven += leave.leaveType.maxAllowedDays;
    totals.totalBalance += leave.balance;
    return totals;
  }, { totalGiven: 0, totalBalance: 0 });



  const data = absentdays
  useEffect(() => {
    if (user && !singleuser) {
      dispatch(GetAUser(id));
    }
    if (singleuser) {
      dispatch(GetLeaveForEmployee(singleuser._id));
      dispatch(GetAbsentDates(singleuser._id))
    }
  }, [dispatch, id, user, singleuser]);



  const percentage = (totalLeaves?.totalBalance / totalLeaves?.totalGiven) * 100;
  return (
    <div className='md:px-12 px-2 flex flex-col gap-10'>
      <div className='w-full h-60 bg-black rounded-2xl shadow-md mt-10 flex flex-row justify-end relative '>
        <div className='md:w-1/2 w-full flex flex-col justify-center'>
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
        <div className='absolute md:bottom-[-140px] bottom-[-140px] left-16 md:left-8 p-4 flex md:flex-row flex-col gap-3 items-center '>
          <div className='size-max  border-green-700 border-2 rounded-full'>
            <img src={singleuser?.profilePicture} className='md:size-40 h-24 w-24 rounded-full ' />
          </div>
          <div className='flex flex-col gap-1 md:gap-2 '>
            <span className='font-Montserrat font-semibold text-base md:text-4xl capitalize'>{singleuser?.name}</span>
            <span className='font-inter text-gray-600 opacity-85 text-xs '>software developer</span>
          </div>
        </div>
      </div>
      <div className='flex md:flex-row flex-col gap-3 w-full mt-28'>
        <div className='md:w-1/2 w-full md:h-max p-4 bg-slate-50'>
          <FullCalendar 
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={absentdays}
            eventBorderColor='black'
            eventBackgroundColor='yellow'
            eventTextColor='black'
            height={600}
          />
        </div>

        <div className='flex flex-col gap-3'>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              {leaveRequests?.length === 0 ? (
                <>No approved leave requests</>
              ) : (
                leaveRequests?.map((leaveRequest, index) => (
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
          <div className='text-sm font-inter items-center font-bold flex gap-2'>
            {leaveRequest?.status === 'pending' && <span className='bg-blue-900 rounded-full size-max p-1 flex'><GiPerpendicularRings className='text-white size-3' /></span>}
            {leaveRequest?.status === 'rejected' && <span className='bg-red-700 size-max rounded-full p-1 flex'><RxCross1 className='text-white font-semibold size-3' /></span>}
            {leaveRequest?.status === 'approved' && <span className='size-max rounded-full p-1 flex'><FcApproval className='size-6' /></span>}
            <span className='capitalize'>{leaveRequest?.status}</span>
          </div>
          {/* <span className=' size-max rounded-full p-1 flex '><FcApproval /></span><span className='capitalize'>{leaveRequest.status}</span> */}
        </div>

        <div className='flex  justify-between'>
          <div className='flex gap-10 text-gray-600 font-inter text-sm opacity-75'>
            <h3>{leaveRequest.leaveType.name}</h3>
            <p>{new Date(leaveRequest.startDate).toLocaleDateString()} - {new Date(leaveRequest.endDate).toLocaleDateString()}</p>
          </div>

          <button onClick={toggleDropdown}><MdArrowDropDown className='size-8' /></button>
        </div>

      </div>
      {isOpen && (
        <div className='mt-4'>
          <p><strong>Reason:</strong> {leaveRequest.reason}</p>
          <p><strong>Status:</strong> {leaveRequest.status}</p>
          {leaveRequest?.managerComments && <p><strong>Message:</strong> {leaveRequest?.managerComments}</p>}

        </div>
      )}
    </div>
  );
};

export default SingleUser
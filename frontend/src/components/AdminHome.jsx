import React, { useEffect } from 'react'
import img1 from '../assets/calander.png';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUser } from '../redux/slice/authSlice';
import { GetallLeavesAdmin } from '../redux/slice/leaveSlice';
import { useNavigate } from 'react-router-dom';
import { IoPeople } from "react-icons/io5";
import { TbNotification } from "react-icons/tb";
const AdminHome = () => {
  const { user, alluser } = useSelector((state) => state?.auth);
  const { leaveRequests, message, allleavesAdmin } = useSelector((state) => state.leave);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if (user) {
      dispatch(GetallLeavesAdmin(''));
    }

  }, [dispatch, user])

  useEffect(() => {
    if (!allleavesAdmin.length) {
      dispatch(GetAllUser());
    }

  }, [dispatch, allleavesAdmin.length])

  console.log(alluser)
  console.log(allleavesAdmin)
  const handleMoreDetails = () => {
    navigate(`/user/${user._id}`);
  };
  const approvedLeaves = allleavesAdmin?.filter((leave) => leave.status === 'approved');
  const today = dayjs();


  const absencesToday = approvedLeaves?.filter(
    (leave) =>
      dayjs(leave.startDate).isSame(today, 'day')&& dayjs(leave.endDate).isSame(today, 'day')
  );
  const absencesFuture = approvedLeaves?.filter(
    (leave) =>
      (dayjs(leave.startDate).isAfter(today, 'day')) ||
      dayjs(leave.endDate).isAfter(today, 'day')
  );


  return (
    <div>

      <div className='w-full h-44 md:mt-6 mt-1 flex flex-row relative px-3'>
        <img src={img1} className='h-full w-full md:w-[80%]' />
        <span className='md:text-4xl absolute top-[50%] left-20 text-white font-inter font-bold'> Welcome Admin! </span>
      </div>
      <div className='w-full md:px-20 px-2 mt-3 flex md:flex-row flex-col-reverse'>
        <div className='md:w-[35%] w-full flex justify-center lg:justify-start flex-col gap-10 '>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>

              <div className='size-max bg-white' >
                <DateCalendar defaultValue={dayjs(new Date(Date.now()))} readOnly />
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <div>
            <div className='bg-white flex flex-col w-full md:w-[80%] p-3 gap-3  mb-10'>
              <div className=' flex items-center gap-3'>
                <IoPeople className='size-6 text-gray-700' />
                <span className='text-xl font-inter font-bold' >Who is on leave</span>
              </div>
              <div className='flex flex-col'>
                <h2 className='text-sm text-gray-400 font-inter'>Today</h2>
                <div className=' flex flex-col gap-2'>
                  {absencesToday?.length === 0 ? <div className='text-sm font-Montserrat font-medium'>No one is on leave today</div> : absencesToday?.map((leave) => (
                    <div key={leave._id} className='flex gap-3 p-3'>
                      <img src={leave?.employeeId?.profilePicture} className="w-16 h-16 rounded-full" />
                      <div className='flex flex-col '>
                        <span className='text-lg font-semibold text-gray-800 opacity-85 font-inter'>{leave.employeeId.name} </span>
                        <span className='text-gray-400 font-inter text-xs ' >software dev</span>
                        <span className='text-gray-400 font-inter text-xs '>{new Date(leave?.startDate).toLocaleDateString()} - {new Date(leave?.endDate).toLocaleDateString()}</span>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className='text-sm text-gray-400 font-inter'>Upcoming</h2>
                <div className=' flex flex-col gap-2'>
                  {absencesFuture?.length === 0 ? <>No one is on leave</> : absencesFuture?.map((leave) => (
                    <div key={leave._id} className='flex gap-3 p-3'>
                      <img src={leave?.employeeId?.profilePicture} className="w-14 h-14 rounded-full" />
                      <div className='flex flex-col '>
                        <span className='text-lg font-semibold text-gray-800 opacity-85 capitalize font-inter'>{leave.employeeId.name} </span>
                        <span className='text-gray-400 font-inter text-xs '>software dev</span>
                        <span className='text-gray-400 font-inter text-xs '>{new Date(leave?.startDate).toLocaleDateString()} - {new Date(leave?.endDate).toLocaleDateString()}</span>

                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='md:w-1/2 w-full px-2 flex flex-col gap-3'>
          <div className='flex p-4 justify-between bg-white'>
            <h3 className='font-bold font-inter md:text-xl '>Notifications</h3>
            <span className='text-orange-600 hover:cursor-pointer' onClick={() => navigate(`/manager/leaverequests/0`)}>See more</span>
          </div>

          <div className='h-32 w-full px-3 md:w-[80%] bg-gray-900 rounded-lg shadow-sm flex gap-9 p-4'>
            <div className='flex justify-center items-center'>
              <span className='p-1 flex size-max rounded-lg bg-slate-700' ><TbNotification className='text-white size-6' /></span>
            </div>
            <div className=' flex flex-col gap-2'>
              <span className='text-white md:text-base text-sm font-inter capitalize '>{allleavesAdmin[0]?.employeeId?.name} just sent you a leave request</span>
              <span className='text-white text-[10px] '>{allleavesAdmin[0]?.startDate.split('T')[0]}/{allleavesAdmin[0]?.endDate.split('T')[0]}</span>
              <div className='h-8 w-14 p-1 flex items-center text-xs justify-center font-inter bg-orange-500 text-white rounded-lg'>More</div>
            </div>
          </div>
          <div>
            <div className="">
              <h3 className='font-bold font-inter text-xl  capitalize bg-white p-2 mb-2'>All user</h3>
              {alluser?.length === 0 ? <>loading</> : alluser?.map((user) => (
                <div key={user?._id} className=" bg-white flex items-center justify-between border p-4 rounded-md shadow-md">
                  <div className="flex items-center">
                    <img
                      src={user?.profilePicture}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="md:text-xl text-base font-bold capitalize font-inter">{user?.name}</div>
                      <div className="text-xs text-gray-500">Developer</div>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => navigate(`/manager/user/${user._id}`)} className="text-blue-500 md:text-base text-sm underline">
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminHome
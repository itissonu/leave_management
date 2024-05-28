import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import img1 from '../assets/leave.png';

import AllLeaveRequests from '../leaverequests/AllLeaveRequests';
import PendingLeaveRequests from '../leaverequests/PendingLeaveRequests';
import ApprovedLeaveRequests from '../leaverequests/ApprovedLeaveRequests';
import RejectedLeaveRequests from '../leaverequests/RejectedLeaveRequests';
import { GetallLeavesAdmin } from '../redux/slice/leaveSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';



const LeaveRequestAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tabIndex } = useParams();
  const [activeTabIndex, setActiveTabIndex] = useState(Number(tabIndex) || 0);
  useEffect(() => {

    dispatch(GetallLeavesAdmin(''));
  }, [dispatch]);

  const { allleavesAdmin, loading } = useSelector((state) => state.leave);
  console.log(allleavesAdmin)
  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    navigate(`/manager/leaverequests/${index}`);
  };

  const renderTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <AllLeaveRequests leaveRequests={allleavesAdmin} />;
      case 1:
        return <PendingLeaveRequests leaveRequests={allleavesAdmin?.filter(leave => leave.status === "pending")} />;
      case 2:
        return <ApprovedLeaveRequests leaveRequests={allleavesAdmin?.filter(leave => leave.status === "approved")} />;
      case 3:
        return <RejectedLeaveRequests leaveRequests={allleavesAdmin?.filter(leave => leave.status === "rejected")} />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col'>
      {loading && <Loader />}
      <div className='w-full h-44 md:mt-6 mt-2 flex flex-row relative'>
        <img src={img1} className='h-full md:w-[80%] px-2' />
        <span className='md:text-4xl absolute top-[50%] left-12 md:left-20 text-white font-inter font-bold'>Leave Requests!</span>
      </div>

      <div className="flex mt-5 md:gap-7 gap-2 md:px-14">
        {['All', 'Pending', 'Approved', 'Rejected'].map((tab, index) => (
          <button key={index} className={`h-9 w-36  p-2 md:text-base text-xs rounded-lg shadow-md text-white font-inter ${activeTabIndex === index ? 'bg-blue-500' : 'bg-black'}`} onClick={() => handleTabClick(index)}>{tab}</button>
        ))}
      </div>
      <div className='mt-5 '>{renderTabContent()}</div>

    </div>
  );
};

export default LeaveRequestAdmin;

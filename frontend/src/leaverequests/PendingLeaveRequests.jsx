import React, { useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { GiPerpendicularRings } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { GetallLeavesAdmin, UpdateLeave } from '../redux/slice/leaveSlice';
//import { approveLeave, rejectLeave } from '../redux/actions/leaveActions';

const PendingLeaveRequests = ({ leaveRequests }) => {
    const dispatch = useDispatch();
    const [managerComments, setManagerComments] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [status, setStatus] = useState('')

    const handleChange = (event) => {

        setManagerComments(event.target.value);
    }
   const toggleInput = (leaveId, status) => {
        
        setStatus(status)
        setShowInput(prevState => ({
            ...prevState,
            [leaveId]: !prevState[leaveId]
        }));
    };
    const handleApprove = (id) => {
        const data = {
            id: id,
            status: status,
            managerComments: managerComments
        }
        dispatch(UpdateLeave(data)).then(() => {

            dispatch(GetallLeavesAdmin(''));


            setManagerComments('');
            setShowInput((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        });
    }

  

    return (
        <div className='flex md:flex-row flex-col md:w-full md:flex-wrap gap-2 px-2'>
            {leaveRequests?.map((leave) => (
                <div key={leave._id} className="md:w-[40%] w-full  bg-white p-4 flex gap-3 md:gap-6">
                    <div className="flex gap-4 md:w-[15%] w-[24%]">
                        <img src={leave?.employeeId?.profilePicture} alt="Employee" className="w-20 h-16 rounded-full" />
                    </div>
                    <div className='flex flex-col md:w-[85%] w-[76%] gap-3'>
                        <div className="flex justify-between gap-1">
                            <p className="font-inter font-bold text-lg capitalize">{leave?.employeeId?.name}</p>
                            <div className='text-sm font-inter items-center font-bold flex gap-2'>
                                {leave.status === 'pending' && <span className='bg-blue-900 rounded-full size-max p-1 flex'><GiPerpendicularRings className='text-white size-3' /></span>}
                                {leave.status === 'rejected' && <span className='bg-red-700 size-max rounded-full p-1 flex'><RxCross1 className='text-white font-semibold size-3' /></span>}
                                {leave.status === 'approved' && <span className='size-max rounded-full p-1 flex'><FcApproval className='size-6' /></span>}
                                <span className='capitalize'>{leave.status}</span>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm font-inter">{leave?.reason}</p>
                        <p className="text-gray-500 font-semibold opacity-75 text-[10px] font-inter">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
                        <div className="flex gap-5">
                            {leave.status === 'pending' && (
                                <>
                                    <button className="bg-green-200 h-9 w-36 flex justify-center items-center text-sm font-semibold font-inter p-2 rounded-lg" onClick={() => toggleInput(leave._id,"approved")}>
                                        <span className='size-max rounded-full p-1 flex'><FcApproval className='size-6' /></span>
                                        <span className='text-xs'>Approve</span>
                                    </button>
                                    <button className="bg-red-100 h-9 w-36 flex justify-center items-center text-sm font-semibold font-inter gap-1 p-2 rounded-lg" onClick={() => toggleInput(leave._id,"rejected")}>
                                        <span className='bg-red-700 size-max rounded-full p-1 flex'><RxCross1 className='size-3 text-white' /></span>
                                        <span className='text-xs'>Reject</span>
                                    </button>
                                </>
                            )}
                            {leave.status === 'rejected' && (
                                <>
                                    <button className="bg-green-200 h-9 w-36 flex justify-center items-center text-sm font-semibold font-inter p-2 rounded-lg" onClick={() => toggleInput(leave._id,"approved")}>
                                        <span className='size-max rounded-full p-1 flex'><FcApproval className='size-6' /></span>
                                        <span className='text-xs'>Approve</span>
                                    </button>

                                </>
                            )}
                            {leave.status === 'approved' && (
                                <>
                                    <button className="bg-red-100 h-9 w-36 flex justify-center items-center text-sm font-semibold font-inter gap-1 p-2 rounded-lg" onClick={() => toggleInput(leave._id,"rejected")}>
                                        <span className='bg-red-700 size-max rounded-full p-1 flex'><RxCross1 className='size-3 text-white' /></span>
                                        <span className='text-xs'>Reject</span>
                                    </button>

                                </>
                            )}
                        </div>
                        {showInput[leave._id] && (
                            <div className='flex flex-col gap-3'>
                                <input
                                    type="text"
                                    placeholder="Manager comments"
                                    value={managerComments}
                                    onChange={handleChange}
                                    className='border-[1px] h-12 w-full border-gray-300 rounded-lg outline-none'
                                />
                                <div className='flex gap-5'>
                                    <button className="h-9 w-32  p-2 rounded-lg shadow-md text-white font-inter  bg-blue-500  ' " onClick={() => handleApprove(leave?._id)}>Submit</button>
                                    <button className="h-9 w-32  p-2 rounded-lg shadow-md text-white font-inter bg-yellow-500   " onClick={() => setShowInput(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PendingLeaveRequests;

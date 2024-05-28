import React, { useEffect, useState } from 'react'
import img1 from '../assets/desktop.png'
import { useDispatch, useSelector } from 'react-redux'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { leaveRequestSchema } from '../utils/schemas';
import axios from 'axios';
import { Button, MenuItem, TextField } from '@mui/material';
import { HiMiniInformationCircle } from "react-icons/hi2";
import { GetLeaveForEmployee, SubmitLeaveRequest } from '../redux/slice/leaveSlice';
import toast, { Toaster } from 'react-hot-toast';
import { URL } from '../utils/serverurl';

const LeaveRequest = () => {

  const userstate = useSelector((state) => state.auth);
  const vacations = userstate?.user?.leaveBalances
  const { loading, error, success, message } = useSelector((state) => state.leave);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(leaveRequestSchema),
  });
  const onSubmit = (data) => {
    dispatch(SubmitLeaveRequest(data));
    
    reset();
  };

 

  useEffect(() => {
    axios.get(`${URL}leavetype/getalltypes`)
      .then(response => {
        setLeaveTypes(response?.data);
      })
      .catch(error => {
        console.error('Error fetching leave types:', error);
      });
  }, []);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD'); console.log(dateString)
    setValue('startDate', dateString);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD');
    setValue('endDate', dateString);
    setEndDate(date);

  };
  return (
    <div>
  
      <div className='w-full h-60    mt-10 flex flex-row  relative '>
        <img src={img1} className='h-full w-full px-1 md:w-[80%]' />
        <span className='lg:text-4xl absolute top-[50%] left-20 text-white font-inter font-bold'> Vacations </span>
      </div>
      <div className='lg:w-[85%] w-full px-3 lg:px-32 flex flex-col gap-12 mt-5'>
        <div className='w-[100%] lg:w-full h-auto flex flex-wrap  bg-white'>
          {vacations.length === 0 ? <>Loading...</> : vacations?.map((vacation) => (
            <div
              key={vacation._id}
              className='w-36 lg:w-[200px] font-inter h-[100px] bg-white  flex  justify-between items-center p-2'
            > 
              <div className=' flex flex-col justify-start items-center p-2'>
                <span className='text-sm opacity-75 font-bold font-inter text-gray-600'>{vacation?.leaveType?.name}</span>
                <span className='text-xl font-bold text-black font-inter'>
                  {vacation?.balance}/<span className='text-sm text-gray-500'>{vacation?.leaveType?.maxAllowedDays} </span>
                </span>
              </div>
              <div className='h-[80%] w-[1px] bg-black opacity-15' >

              </div>
            </div>
          ))}
        </div>
        <div className='md:h-[400px] h-auto bg-white lg:flex-row flex-col flex mb-9 p-4'>
          <div className='lg:w-[60%] w-full flex flex-col gap-5 p-4'>
            <h3 className='text-2xl font-medium font-inter' >Request a vacation</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <div>

                <select
                  select
                  label="Leave Type"
                  id="leaveType"
                  className='w-full h-12 border-[1px] border-gray-500 rounded-3xl p-2 flex-col justify-center items-center outline-none'
                  {...register('leaveType')}
                >
                  <option value="" disabled selected className='text-sm font-inter flex  font-semibold'>Select Type</option>
                  {leaveTypes.map((leaveType) => (
                    <option key={leaveType?._id} value={leaveType?._id}>
                      {leaveType?.name}
                    </option>
                  ))}
                </select>
                {errors.leaveType && <p className="font-inter text-red-800 font-bold">{errors.leaveType.message}</p>}
              </div>

              <div className='flex gap-5 '>
                <LocalizationProvider dateAdapter={AdapterDayjs} className='rounded-lg'>
                  <DatePicker label="Start date" id='startDate' value={startDate} onChange={handleStartDateChange} className='rounded-lg' />
                  {errors.startDate && <p className="font-inter text-red-800 font-bold">{errors.startDate.message}</p>}
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="End date" id='endDate' value={endDate} onChange={handleEndDateChange}
                    className='' />
                  {errors.endDate && <p className="font-inter text-red-800 font-bold">{errors.endDate.message}</p>}
                </LocalizationProvider>

              </div>


              <div className='w-full'>
                <input
                  label="Reason"
                  id="reason"
                  className='w-full h-12 border-[1px] border-gray-500 rounded-3xl p-2 outline-none'
                  {...register('reason')}
                  placeholder='eg: Bank related work'
                />
              </div>
              {errors.reason && <p className="font-inter text-red-800 font-bold">{errors.reason.message}</p>}


              <button type="submit" className='bg-black w-full h-12 rounded-md shadow-md text-white'>  {loading ? 'Submitting...' : 'Submit'}</button>
            </form>
          </div>
          <div className='lg:w-[40%] w-full bg-red-100 rounded-lg h-auto lg:h-28 p-4'>
            <HiMiniInformationCircle />
            <span className='text-xs font-inter text-gray-700'>
              By submitting this form, you agree to abide by the company's leave policy. Please make sure to review the policy before proceeding.
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LeaveRequest
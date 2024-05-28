import React, { useEffect } from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import login from '../assets/login.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../redux/slice/authSlice';
import { useMediaQuery } from '@mui/material';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(max-width: 900px)');
  

  const onSubmit = (data) => {
    dispatch(LoginUser(data));


  };

  useEffect(() => {
    if (isAuthenticated) {

      if (user.role === 'manager') {
        navigate('/manager');
      } else {
        navigate('/employee');
      }
    }
  }, [isAuthenticated, user, navigate]);
  if (loading) {
    return (<>loading</>)
  }
  const getModalSize = () => {
    if (isSmallScreen) {
      return {
        width: '90%',
        height: 'auto',
      };
    } else if (isMediumScreen) {
      return {
        width: '90%',
        height: 'auto',
      };
    } else {
      return {
        width: 1200,
        height: 700,
      };
    }
  };
  const modalSize = getModalSize();
  return (
<div className='h-full w-full bg-white relative z-50' >
    <Modal
      open={true}
      onClose={false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            outline: "none",
            p: 4,
            zIndex: 49,
            borderRadius: 5,
            ...modalSize,
          }}
      >
        <div className='w-full flex md:flex-row flex-col  items-center justify-center gap-8 h-full '>
          <div className='md:w-1/2'>
            <img src={login} className='w-[17rem] md:w-full'/>
          </div>
          <div className=' w-full md:w-[40%]'>
            <form onSubmit={handleSubmit(onSubmit)} className='md:w-[80%] w-full justify-center flex flex-col gap-7' >
              <div className='flex  justify-start'>
                <span className='text-2xl font-inter font-bold'>Login.</span>
              </div>
              <div className="mb-4 w-[1/2] justify-center flex flex-col gap-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none   md:w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="mb-4 flex flex-col gap-5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none    w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex items-center w-full justify-between">
                <button
                  type="submit" disabled={loading}
                  className="px-4 py-2 bg-black h-16 text-white w-full font-semibold rounded-md hover:bg-slate-950"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </div>
            </form>
            <span className='underline font-bold text-center mt-4 flex justify-center w-[85%] hover:cursor-pointer font-Montserrat ' onClick={()=>navigate('/register')}>Register Here</span>
          </div>
        </div>

      </Box>
    </Modal>
    </div>
  )
}

export default Login
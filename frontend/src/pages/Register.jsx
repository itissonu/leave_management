import React, { useEffect, useState } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OtpInput from "react-otp-input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import login from '../assets/login.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../redux/slice/authSlice';
import axios from 'axios';
import { URL } from '../utils/serverurl';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useMediaQuery } from '@mui/material';

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const Register = () => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isMediumScreen = useMediaQuery('(max-width: 900px)');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [filevalue, setFileValue] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [email, setEmail] = useState('');
    const [newError, setError] = useState(null);
    const { loading, error, success, isAuthenticated } = useSelector((state) => state.auth);
    const [load, setLoad] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const getModalSize = () => {
        if (isSmallScreen) {
            return { width: '90%', height: 'auto' };
        } else if (isMediumScreen) {
            return { width: '90%', height: 'auto' };
        } else {
            return { width: 1200, height: 800 };
        }
    };
    const modalSize = getModalSize();

    const handleSendOTP = async () => {
        try {
            setLoad(true);
            const verifyRes = await axios.post(`${URL}user/verifyuser`, { email: email }, { withCredentials: true });
            if (verifyRes?.data?.success) {
                const otpRes = await axios.post(`${URL}user/send-otp`, { email: email }, { withCredentials: true });
                if (otpRes?.data?.success) {
                    setLoad(false);
                    toast.success("OTP sent successfully");
                    setIsOtpSent(true);
                }
            }
        } catch (error) {
            setError(error.response.data.message);
            setLoad(false);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            setLoad(true);
            const otpVerifyRes = await axios.post(`${URL}user/register/otp`, { otp: otp }, { withCredentials: true });
            if (otpVerifyRes?.data?.success) {
                setIsOtpVerified(true);
                toast.success("OTP verified successfully");
                setLoad(false);
            } else {
                setError("Invalid OTP");
                setLoad(false);
            }
        } catch (error) {
            setError(error.response.data.message || "Error verifying OTP");
            setLoad(false);
        }
    };

    const Signup = async (data) => {
        try {
            setLoad(true)
            let photo;
            const photodata = new FormData();
            if (filevalue) {
                photodata.append('file', filevalue);
                photodata.append('upload_preset', 'upload');
            }
            if (filevalue) {
                const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dbsonu270/image/upload', photodata);
                const { url } = uploadRes.data;
                photo = url;
            }
            const userData = { ...data, email: email, profilePicture: photo || '' };
            dispatch(RegisterUser(userData));
            setLoad(false)
           
        } catch (error) {
            setLoad(false)
            setError(error.response.data.message || "Error registering user");
        }
    };
    useEffect(() => {
        if (isAuthenticated && success) {
            toast.success("Registration successful");
            navigate('/login');
        }
    }, [success, isAuthenticated,navigate]);

    const onSubmit = (data) => {
        if (!isOtpSent) {
            handleSendOTP();
        } else if (!isOtpVerified) {
            if (otp) {
                handleVerifyOTP();
            } else {
                setError("Please enter the OTP");
            }
        } else {
            Signup(data);
        }
    };

    return (
        <div className='h-full w-full bg-white relative z-50'>
            {load && <Loader />}
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
                    <div className='w-full flex md:flex-row flex-col items-center justify-center gap-2 h-full'>
                        <div className='md:w-1/2'>
                            <img src={login} className='w-[17rem] md:w-full' alt="Login" />
                        </div>
                        <div className='w-full md:w-[40%]'>
                            <form onSubmit={handleSubmit(onSubmit)} className='md:w-[80%] w-full justify-center flex flex-col gap-2'>
                                <div className='flex justify-start'>
                                    <span className='text-2xl font-inter font-bold'>Register.</span>
                                </div>
                                <div className="mb-4 flex flex-col gap-1">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        onChange={e => setEmail(e.target.value)}
                                        className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none md:w-full"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                {(newError && !isOtpVerified) && <p className="text-red-500 text-sm">{newError}</p>}
                                {isOtpSent && !isOtpVerified && (
                                    <div className="mb-4 flex flex-col gap-1">
                                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                            OTP
                                        </label>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    placeholder="-"
                                                    style={{
                                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                                    }}
                                                    className="w-[48px] lg:w-[60px] border-0 bg-gray-800 rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                                />
                                            )}
                                            containerStyle={{
                                                justifyContent: "space-between",
                                                gap: "0 6px",
                                            }}
                                        />
                                    </div>
                                )}
                                {!isOtpSent && (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        className="w-full bg-yellow-400 py-[12px] px-[12px] rounded-[8px] mt-4 font-medium text-black flex justify-center items-center"
                                    >
                                        {load ? <span className='h-6 w-6 rounded-full border-b-2 border-white animate-spin flex '></span> : 'Send OTP'}
                                    </button>
                                )}
                                {isOtpSent && !isOtpVerified && (
                                    <button
                                        type="button"
                                        onClick={handleVerifyOTP}
                                        className="w-full bg-yellow-400 py-[12px] px-[12px] rounded-[8px] mt-4 font-medium text-black flex justify-center items-center"
                                    >
                                        {load ? <span className='h-6 w-6 rounded-full border-b-2 border-white animate-spin flex '></span> : 'Verify OTP'}
                                    </button>
                                )}
                                {isOtpVerified && (
                                    <>
                                        <div className="mb-4 flex flex-col gap-1">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                {...register("name")}
                                                className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none md:w-full"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                        </div>
                                        <div className="mb-4 flex flex-col gap-1">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                {...register("password")}
                                                className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none w-full"
                                            />
                                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                        </div>
                                        <div className="mb-4 flex flex-col gap-1">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone
                                            </label>
                                            <input
                                                id="phone"
                                                type="text"
                                                {...register("phone")}
                                                className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none w-full"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                        </div>
                                        <div className="mb-4 flex flex-col gap-1">
                                            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                                                Profile Picture
                                            </label>
                                            <input
                                                id="profilePicture"
                                                type="file"
                                                required
                                                onChange={(e) => setFileValue(e.target.files[0])}
                                                className="mt-1 p-2 border-b-gray-500 border-b-[1px] outline-none w-full"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-yellow-400 flex justify-center items-center py-[12px] px-[12px] rounded-[8px] mt-4 font-medium text-black"
                                        >
                                            {load ? <span className='h-6 w-6 rounded-full border-b-2 border-white animate-spin flex '></span> : "Register"}

                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Register;

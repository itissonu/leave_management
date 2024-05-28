import { MotionConfig, motion } from 'framer-motion'
import React, { useState } from 'react'
import { IoIosArrowRoundForward, IoMdCheckmarkCircle } from "react-icons/io";

const Pricing = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='h-auto w-full relative z-50 overflow-hidden  bg-gray-50'>

      <div className="flex   z-10 px-3  pt-[15px] lg:pr-[170px] pb-[80px]  lg:pl-[170px] flex-col items-center gap-12 justify-center relative ">
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-10'>
            <span className='text-3xl lg:text-[60px] font-medium whitespace-nowrap font-inter  flex justify-center  '>Pick Your Plan</span>
          </div>

          <span className='flex justify-center whitespace-nowrap text-gray-800 opacity-90 font-inter lg:text-lg '>Ease  Your management  with the right plan.</span>

        </div>
        <div className='flex lg:flex-row  flex-col gap-5 w-full'>
          <div className=' w-full lg:w-1/2 border-[1px] flex flex-col gap-4 bg-white border-gray-200 rounded-3xl shadow-xl h-[700px] overflow-hidden  p-3'>

            <div className=''>
              <button className='bg-black rounded-3xl p-2 w-28 text-white font-bold' >Starter</button>
            </div>
            <div className=' flex flex-col gap-4'>
              <div className=' flex items-center gap-5'>
                <span className='flex text-[60px] font-inter font-bold '>$999</span>
                <span className='font-inter font-semibold text-xl '>/mo</span>
              </div>
              <div className='flex flex-col gap-0'>
                <div className='flex items-center gap-3 p-3 m-0'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex font-semibold text-lg font-inter'>
                    Pause / cancel anytime
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex font-semibold text-lg font-inter'>
                    Easy to manage design requests
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    Dedicated project manager
                  </span>
                </div>
                <div className='flex items-center gap-1 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    1 request at the time
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    24/7 Priority Support
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    Framer Development
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    SEO Marketing
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    2 Weeks Delivery
                  </span>
                </div>
              </div>
            </div>
            <div className='flex  w-full  flex-col gap-1 justify-center'>
              <div className='w-full justify-center items-center flex'>
                <div className='w-[90%] bg-custom-orange hover:cursor-pointer p-2 rounded-3xl items-center justify-center flex '>
                  <span className='text-base font-inter font-semibold text-white'>Subscribe</span>
                </div>
              </div>

              <div className='flex w-full p-1 h-max justify-center items-center '>
                <span className='font-inter text-lg '>2 Spots available</span>
              </div>
            </div>
          </div>



          <div className=' w-full lg:w-1/2 border-[1px] flex flex-col gap-4 border-gray-200 rounded-3xl shadow-xl h-[700px] overflow-hidden bg-red-100  p-3'>

            <div className=''>
              <button className='bg-black rounded-3xl p-2 w-28 text-white font-bold' >Premium</button>
            </div>
            <div className=' flex flex-col gap-4'>
              <div className=' flex items-center gap-5'>
                <span className='flex text-[60px] font-inter font-bold '>$2499</span>
                <span className='font-inter font-semibold text-xl '>/mo</span>
              </div>
              <div className='flex flex-col gap-0'>
                <div className='flex items-center gap-3 p-3 m-0'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex font-semibold text-lg font-inter'>
                    Pause / cancel anytime
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex font-semibold text-lg font-inter'>
                    Easy to manage design requests
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    Dedicated project manager
                  </span>
                </div>
                <div className='flex items-center gap-1 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    1 request at the time
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    24/7 Priority Support
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    Framer Development
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    SEO Marketing
                  </span>
                </div>
                <div className='flex items-center gap-3 p-3'>
                  <span className=' flex'>
                    <IoMdCheckmarkCircle size={30} className='text-custom-orange' />
                  </span>
                  <span className='flex text-lg font-inter'>
                    2 Weeks Delivery
                  </span>
                </div>
              </div>
            </div>
            <div className='flex  w-full  flex-col gap-1 justify-center'>
              <div className='w-full justify-center items-center flex'>
                <div className='w-[90%] bg-custom-orange  hover:cursor-pointer p-2 rounded-3xl items-center  justify-center flex ' onMouseEnter={() => setIsHovered(true)}

                  onMouseLeave={() => setIsHovered(false)}>
                  <span className='text-base font-inter font-semibold flex text-white'>Subscribe
                   </span>
                </div>
              </div>

              <div className='flex w-full p-1 h-max justify-center items-center '>
                <span className='font-inter text-lg '>2 Spots available</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Pricing
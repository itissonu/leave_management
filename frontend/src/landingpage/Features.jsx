import React, { useRef } from 'react'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import { motion, useInView } from "framer-motion";
const Features = () => {

  const ref5 = useRef(null);
  const isInViewCon = useInView(ref5, );

  return (
    <div className='bg-white h-max'>
      <motion.div
        style={{
          transform: isInViewCon ? "none" : "translateX(-140px)",
          opacity: isInViewCon ? 1 : 0,
          transition: "transform 0.7s ease-out, opacity 0.7s ease-out"
        }}

        className='flex  items-center gap-5 lg:flex-row flex-col w-full lg:max-w-[80%]  p-3 '>
       
        <motion.img src={img1} className='size-96' />
        <span className='lg:text-lg text-sm font-inter whitespace-normal border-gray-50 border-[1px]  bg-green-200 max-w-[90%] shadow-md shadow-red-100 text-black rounded-2xl p-4 '>LeaveEase is a comprehensive leave management application designed to streamline the leave request and approval process. Key features include a user-friendly dashboard, real-time leave tracking, automated leave calculations, and customizable leave policies.</span>

      </motion.div>
      <div className='w-[100%] flex justify-end '>
        <motion.div

          style={{
            transform: isInViewCon ? "none" : "translateX(140px)",
            opacity: isInViewCon ? 1 : 0,
            transition: "transform 0.7s ease-out, opacity 0.7s ease-out"
          }} ref={ref5} className='flex  items-center gap-5 w-full lg:flex-row flex-col-reverse  lg:max-w-[80%]  p-3 '>

          <span className='lg:text-lg text-sm font-inter whitespace-normal border-gray-50 border-[1px]  bg-gray-200 max-w-[90%] shadow-md shadow-red-100 rounded-2xl p-4 '>It offers an employee self-service portal, manager approval workflows, and leave balance management. Additionally, LeaveEase provides notifications and alerts, detailed reporting and analytics, and mobile access. This app simplifies leave management, ensuring efficiency and transparency for both employees and managers..</span>
          <img src={img2} className='size-96 rounded-full' />

        </motion.div>
      </div>


    </div>
  )
}

export default Features
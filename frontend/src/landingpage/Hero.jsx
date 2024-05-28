import React, { useState } from 'react'
import { animate, motion, useMotionValue } from "framer-motion";
import hero from '../assets/hero.png'
const Hero = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex bg-black flex-col items-center justify-start md:gap-y-20 md:py-12 px-0  relative z-10">
            <div className=' pt-32 md:pt-[260px] bg-black pb-[10px] w-full flex-col gap-10 flex justify-center items-center'>

                <div className='w-full md:w-[80%]  flex flex-col text-white'>
                    <span className="text-3xl md:text-[87px] font-inter font-semibold flex flex-col md:flex-row justify-center leading-tight text-center">
                        Struggling with leave management? <br className="md:hidden" /> We've got your back.
                    </span>
                    <span className='text-sm text-center  md:text-lg font-inter text-gray-800 flex justify-center opacity-90 p-2'>Unlimited design, pause or cancel anytime.</span>
                </div>
                <div className="overflow-visible">
                    <button
                        className="hover:cursor-pointer transition-all duration-300 h-max w-max   p-2 rounded-3xl bg-gradient-to-b from-orange-300 via-orange-400 to-red-400 flex items-center "

                    >
                        <span className="text-sm font-semibold text-white ml-4">Book a Call</span>
                       
                    </button>
                </div>

            </div>
            <div className=' bg-white w-full pt-15 md:px-24 py-4 md:py-24 flex md:justify-center md:items-center'>
                <img src={hero} className='md:size-fit size-96' />
            </div>
        </div>
    )
}

export default Hero
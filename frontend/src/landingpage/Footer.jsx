import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='flex col'>
                <div className="fixed bottom-0 left-0 w-full h-72 lg:h-1/2 flex flex-col flex-nowrap gap-0 justify-center z-0 bg-black lg:pl-[350px] lg:pr-[350px]">
                    <div>
                        <div class="outline-none w-full relative top-[-20px]  lg:top-[-50px] flex flex-col justify-start flex-wrap flex-shrink-0  ">
                            <h2 class="lg:text-[70px] font-inter whitespace-normal text-white  font-medium flex justify-center text-center leading-[70px]">
                                Ready for Growth? Let's Talk
                            </h2>

                        </div>

                        <div className='flex justify-between items-centerp-3 w-full'>
                            <div className='flex '>
                                <span

                                    className="flex flex-nowrap gap-2 items-center hover:cursor-pointer"
                                >
                                    {/* <a href="#">
                                        <img className="size-8 bg-red-100" src={logo} alt="" />
                                    </a> */}
                                   
                                </span>
                            </div>

                            {/* <div className=' flex gap-5 items-center'>
                            <span><SlSocialYoutube className='text-white h-8 w-8' /></span>
                            <span><SlSocialInstagram className='text-white h-8 w-8' /></span>
                            <span><SlSocialLinkedin className='text-white h-8 w-8' /></span>
                            <span><SlSocialTwitter className='text-white h-8 w-8' /></span>
                        </div> */}
                        </div>
                        <div className='mt-12'>
                            <span className='lg:text-lg font-inter p-4 text-white'>© 2024 Soumya Ranjan Sahu. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
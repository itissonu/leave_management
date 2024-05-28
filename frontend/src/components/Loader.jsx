
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="h-screen w-full bg-slate-200 flex justify-center items-center">
      {/* <motion.div
        className="h-[200px] w-[200px] bg-black shadow-purple-400 shadow-xl "
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      /> */}

      <div  className='bg-orange-50 bg-opacity-50 h-screen w-full justify-center items-center flex bg-transparent  top-0 fixed  z-50'>
    <div className='h-max w-max  border-[1px] border-orange-500 shadow-xl p-5 bg-orange-500  rounded-lg'>
    <span className='h-10 w-10 rounded-full flex  border-b-4 border-dashed border-b-orange-50  border-white animate-spin'></span>
    </div>
        
    </div>
    </div>

  );
}

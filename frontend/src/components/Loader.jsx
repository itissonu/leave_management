
import { motion } from "framer-motion";

export default function Loader() {
  return (


    <div className='bg-orange-50 bg-opacity-50 h-screen w-full justify-center items-center flex bg-transparent  top-0 fixed  z-50'>
      <div className='h-max w-max  border-[1px] border-orange-500 shadow-xl p-5 bg-orange-500  rounded-lg'>
        <span className='h-10 w-10 rounded-full flex  border-b-4 border-dashed border-b-orange-50  border-white animate-spin'></span>
      </div>

    </div>


  );
}

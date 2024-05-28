import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate()
    const handleHover = (itemName) => {
        setHoveredItem(itemName);
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 640) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const navItems = [
        { id: 1, name: "Our Work", href: "#Hero" },
        { id: 2, name: "Features", href: "#Features" },

        { id: 4, name: "Pricing", href: "#Pricing" },
        ,
    ];
   

    return (
        <div className={`navbar fixed top-0 w-full flex justify-center items-center p-2 z-50 transition-colors duration-300 ${scrolled ? 'bg-white text-black' : 'bg-black text-white'}`}>
          
            <div className="wrapper w-full max-w-[1440px] flex items-center justify-between ">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-nowrap gap-2 hover:cursor-pointer"
                >

                    <p className="font-Shadows text-2xl font-semibold">LeavePro.</p>
                </motion.span>

                <div className="md:flex gap-4 hidden">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className="relative flex items-center"

                            onMouseEnter={() => handleHover(item.name.toLowerCase())}
                            onMouseLeave={() => handleHover(null)}
                        >
                            <motion.a
                                href={item.href}
                                className="p-2"
                                initial={{ opacity: 1 }}
                                whileTap={{ scale: 0.95 }}

                            >
                                <span className="font-inter font-semibold">{item.name}</span>
                            </motion.a>
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: hoveredItem === item.name.toLowerCase() ? 1 : 0, width: hoveredItem === item.name.toLowerCase() ? '90%' : 0 }}
                                transition={{ duration: 0.3 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2 absolute flex-none border-b-4 h-min w-full bottom-0  ${scrolled ? 'border-b-black' : 'border-b-white'}`}
                            ></motion.span>
                        </motion.div>
                    ))}
                </div>

                <div onClick={() => navigate('/login')} className="p-2 m-2 justify-center hover:cursor-pointer w-[100px] md:w-[200px] border-orange-300 rounded-3xl border-2 flex font-inter">
                    <span >Login.</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
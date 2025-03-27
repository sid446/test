import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useSidebar } from "../context/SideBarContext"; // Import the custom hook
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { isOpen, setIsOpen } = useSidebar(); // Use the correct context hook
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate("/details")

  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="sidebar"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          exit={{ x: -200 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="w-[10rem] flex flex-col h-full bg-zinc-700 fixed z-10"
        >
          {/* Close Button */}
          <div className="w-[10rem] h-[3rem] flex flex-row justify-end pt-2">
            <motion.button
              onClick={() => setIsOpen(false)}
              className="w-[2rem] h-[2rem] p-1 bg-zinc-800 rounded-l-xl flex items-center justify-center"
            >
              <X size={20} className="text-white" />
            </motion.button>
          </div>

          {/* Sidebar Option */}
          <div className="w-[10rem] h-[3rem]">
            <motion.button onClick={handleClick} className="w-[10rem] h-[3rem] text-white bg-zinc-600 hover:bg-zinc-800">
              <h1 className="font-semibold font-mono">Details</h1>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        // Open Sidebar Button
        <div>
          <motion.button
            key="sidebar-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className=" w-[2.5rem] h-[2rem] mt-2 ml-2 absolute top-3     bg-zinc-400 rounded-xl p-1 flex items-center justify-center"
          >
            <Menu size={20} className="text-black" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}

export default SideBar;

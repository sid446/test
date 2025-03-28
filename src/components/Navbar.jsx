import React, { useContext } from 'react'
import {   User,Mail ,LogOut,UserRoundX} from 'lucide-react';
import { Codesandbox } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {user ,logout,deleteAccount}=useContext(AuthContext)  
    const navigate=useNavigate()  
    const handleLogout=()=>{
        logout()
    }
    const handleDeleteAccount=()=>{
        deleteAccount()
        navigate('/login')
        
    }
  return (
    <div className='w-full h-full flex justify-between items-center p-8   bg-zinc-600 overflow-hidden'>
        <span className='flex items-center text-white gap-3  font-bold text-2xl ml-6'>
        <Codesandbox color='white' size={50}/>
      
        </span>
        <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-[3rem] h-[3rem] rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <User size={30} className=" text-white" />
              </motion.button>
              <AnimatePresence>
  {isDropdownOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-[4.5rem] right-0 mt-2 w-full sm:w-48 max-w-xs shadow-lg bg-zinc-700 ring-1 ring-black ring-opacity-5 rounded-md z-50"
      role="menu"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 py-2 flex flex-row items-center gap-2 text-sm text-white hover:bg-zinc-600 rounded-t-md"
      >
        <Mail size={20} className="flex-shrink-0"/>
        <span className="truncate">{user.email}</span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 py-2 text-sm text-white flex flex-row items-center gap-2 hover:bg-zinc-600"
      >
        <LogOut size={20} className="flex-shrink-0"/>
        <button onClick={handleLogout} className="text-left w-full">Logout</button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 py-2 text-sm flex flex-row items-center gap-2 text-white hover:bg-zinc-600 rounded-b-md"
      >
        <UserRoundX size={20} className="flex-shrink-0"/>
        <button onClick={handleDeleteAccount} className="text-left w-full">Delete Account</button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        
    </div>
  )
}

export default Navbar
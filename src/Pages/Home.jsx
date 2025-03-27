import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {  useSidebar } from "../context/SideBarContext.jsx";


function Home() {
    const { isAuth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { isOpen,setIsOpen } = useSidebar()

    useEffect(() => {
        const checkAuth = () => {
            if (!sessionStorage.getItem("isAuth")) {
                logout();
                navigate("/login");
            }
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, [isAuth, navigate, logout]);

    return (
        <div className="w-full h-full  bg-zinc-800 flex flex-col overflow-hidden text-white justify-center items-center">
            
            <h1 className="text-white text-2xl font-bold">Welcome to Home</h1>
                    <p className="text-zinc-300 mt-2">
                        This is your main dashboard area. Content will be displayed here.
                    </p>
              
        </div>
    );
}

export default Home;
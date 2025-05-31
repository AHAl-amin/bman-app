




import React, { useState } from 'react';

import { GoBellFill } from "react-icons/go";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";

import { PiChefHatFill } from 'react-icons/pi';
import { Link, NavLink,} from "react-router-dom";


const UserDashboardNavbar = () => {
  
    const [showAddChefModal, setShowAddChefModal] = useState(false);
  

   

    const toggleAddChefModal = () => {
        setShowAddChefModal(!showAddChefModal);
    };

    // Only show modal if current path is /dashboard/community
 

    return (
        <>
            <div className="flex items-center justify-end pt-10 lora h-16 px-6 bg-white md:max-w-[170vh] mx-auto md:ml-[260px] md:w-[calc(100%-240px)]">
                <div className="flex items-center space-x-8">
                    <div className="hidden md:block">
                        <div className="flex gap-10">
                            {/* Conditionally render "Add Chefs" or "New Creation" based on path */}
                          
                                <Link
                                    to="/"
                                    onClick={toggleAddChefModal}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-[#5B21BD] rounded-[10px] cursor-pointer"
                                >
                                    <PiChefHatFill />
                                    <span className="font-medium">Add Chefs</span>
                                    <IoMdAdd />
                                </Link>
                           

                            {/* Profile button */}
                            <button className="flex items-center text-[#5B21BD] gap-2 px-4 py-2 border-[#CCBAEB] border rounded-[10px] cursor-pointer">
                                <PiChefHatFill />
                                <span className="text-[#5B21BD] font-medium">Bobon lina</span>
                                <IoIosArrowDown className="h-5 w-5 text-[#5B21BD]" />
                            </button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <NavLink to="/dashboard/user_notifications">
                        <div className="relative">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-200 cursor-pointer">
                                <GoBellFill className="h-7 w-7 text-[#5B21BD]" />
                            </button>
                            <div className="absolute text-[10px] p-[5px] top-[6px] right-[10px] bg-gray-200 rounded-full"></div>
                        </div>
                    </NavLink>

                    {/* User Profile */}
                    <div className="flex items-center space-x-2">
                        <div className="hidden md:block">
                            <img
                                src="https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
                                alt="User profile"
                                className="h-10 w-10 rounded-full"
                            />
                        </div>
                        <span className="text-[17px] font-medium md:block hidden">Cameron</span>
                    </div>
                </div>

              
            </div>

            {/* Add Chef Modal - Only shows when path is /dashboard/community */}
           


        </>
    );
};

export default UserDashboardNavbar;
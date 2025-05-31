


import { NavLink, useLocation } from "react-router-dom";
import { IoReorderThreeOutline, IoSettingsOutline } from "react-icons/io5";
import login_img2 from '../../../assets/image/Admin_login_img.png';
import { FaBrain, FaHeart, FaRegLightbulb } from "react-icons/fa";
import { BsChatDotsFill, BsFillChatDotsFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { useState } from "react";
import { PiChefHatFill } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const isProjectActive = location.pathname.startsWith('/dashboard/user_notifications');
  const isDashboardActive =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/dashboard/recipes_dettails") ||
    ["/dashboard/createBuyerOrder", "/dashboard/buyer_candidate_list"].includes(location.pathname);

  // State to control sidebar visibility on small devices
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="lora">
      {/* Toggle Icon for Small Devices */}
      <div className="md:hidden flex justify-start p-4 bg-[#5B21BD]">
        <IoReorderThreeOutline
          className="h-8 w-8 text-[#5B21BD] cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#CCBAEB] pt-10 lora transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:block h-screen`}
      >
        <NavLink className="flex justify-center">
          <img src={login_img2} alt="logo" className="w-[129px] h-[110px]" />
        </NavLink>
        <div className="flex flex-col gap-2 pt-5 mx-5">
          <NavLink
            to="/dashboard"
            className={`flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
              isDashboardActive
                ? 'bg-[#5B21BD] text-white rounded-md'
                : 'text-[#5B21BD] hover:bg-[#CCBAEB] hover:text-white rounded-md'
            }`}
          >
            <PiChefHatFill className="h-6 w-6" />
            <h1 className="text-lg font-medium text-white">Recipes</h1>
          </NavLink>

          <NavLink
            to="/dashboard/ai_chat"
            className={() =>
              location.pathname.startsWith('/dashboard/ai_chat') ||
              location.pathname.startsWith('/dashboard/inspiration_chat')
                ? 'flex items-center gap-3 px-3 py-2 bg-[#5B21BD] text-white rounded-md w-full'
                : 'flex items-center gap-3 px-3 py-2 text-[#5B21BD] hover:bg-[#a07eda] hover:text-white rounded-md'
            }
          >
            <BsFillChatDotsFill className="h-6 w-6" />
            <h1 className="text-lg font-medium text-white">AI Chat</h1>
          </NavLink>

          <NavLink
            to="/dashboard/community"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 transition-colors duration-200 w-full ${
                isActive
                  ? 'bg-[#5B21BD] text-white rounded-md'
                  : 'text-[#5B21BD] hover:bg-[#a07eda] hover:text-white rounded-md'
              }`
            }
          >
            <FaPeopleGroup className="h-6 w-6" />
            <h1 className="text-lg font-medium text-white">Community</h1>
          </NavLink>

          <NavLink
            to="/dashboard/save_recipes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 transition-colors duration-200 w-full ${
                isActive
                  ? 'bg-[#5B21BD] text-white rounded-md'
                  : 'text-[#5B21BD] hover:bg-[#a07eda] hover:text-white rounded-md'
              }`
            }
          >
            <FaHeart className="h-6 w-6" />
            <h1 className="text-lg font-medium text-white">Saved Recipes</h1>
          </NavLink>

          <NavLink
            to="/dashboard/profile_settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 transition-colors duration-200 w-full ${
                isActive
                  ? 'bg-[#5B21BD] text-white rounded-md'
                  : 'text-[#5B21BD] hover:bg-[#a07eda] hover:text-white rounded-md'
              }`
            }
          >
            <IoSettingsOutline className="h-6 w-6" />
            <h1 className="text-lg font-medium text-white">Profile & Setting</h1>
          </NavLink>
        </div>

        <NavLink to='/user_signin' className="flex items-center gap-2 justify-center text-[#5B21BD] h-full">
          <RiLogoutCircleLine /> <p>Logout</p>
        </NavLink>
      </div>

      {/* Overlay for Small Devices */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default UserDashboardSidebar;
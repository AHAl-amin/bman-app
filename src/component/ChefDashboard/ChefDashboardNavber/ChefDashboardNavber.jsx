import { GoBellFill } from 'react-icons/go';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetProfileQuery } from '../../../Rudux/feature/ApiSlice';

function ChefDashboardNavber() {
  const { data: profileList } = useGetProfileQuery();
  const location = useLocation();

  const isChefCommunityPath = location.pathname === '/chef_dashboard/chef_community';
  const user = profileList?.user || {};

  return (
    <div className="flex items-center justify-end pt-10 lora h-16 px-6 md:max-w-[170vh] mx-auto md:ml-[260px] md:w-[calc(100%-240px)]">
      <div className="flex items-center space-x-8">
        <NavLink to="/dashboard/user_notifications">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-200 cursor-pointer">
              <GoBellFill className="h-7 w-7 text-[#5B21BD]" />
            </button>
            <div className="absolute text-[10px] p-[5px] top-[6px] right-[10px] bg-gray-200 rounded-full"></div>
          </div>
        </NavLink>

        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-medium md:block hidden text-gray-400">
              {user?.first_name || 'Chef'}
            </span>
            <img
              src={
                user?.image
                  ? `http://192.168.10.124:3000/api${user.image}`
                  : "https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
              }
              alt="User profile"
              className="h-10 w-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChefDashboardNavber;








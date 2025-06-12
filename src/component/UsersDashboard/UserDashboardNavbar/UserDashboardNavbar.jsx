import { useState, useEffect } from "react";
import { GoBellFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { PiChefHatFill } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useGetAllBrandsQuery, useGetProfileQuery } from "../../../Rudux/feature/ApiSlice";

import { setBrandId } from "../../../Rudux/feature/BrandSlice";
import { useDispatch } from "react-redux";

const UserDashboardNavbar = () => {
	const dispatch = useDispatch();
	const [userImageUrl, setUserImageUrl] = useState(
		"https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
	);
	const { data: profileList } = useGetProfileQuery();
	const { data: getAllBrands } = useGetAllBrandsQuery();
	console.log("Profile List:", profileList);
	const userData = profileList?.user || {};
	console.log(userData,"dasdfsdf")
	const brands = getAllBrands?.data || [];
	console.log("Brands:", brands);
	const [userName, setUserName] = useState("");

	useEffect(() => {
		if (profileList?.user) {
			setUserName(profileList.user.username || "");
			setUserImageUrl(
				profileList.user.image
					? `http://192.168.10.124:3000${profileList.user.image}`
					: "https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
			);
		}
	}, [profileList]);

	const [showAddChefModal, setShowAddChefModal] = useState(false);
	const toggleAddChefModal = () => {
		setShowAddChefModal((prev) => !prev);
	};

	// const selectedBrandId = useSelector((state) => state.brand.selectedBrandId);

	const handleBrandChange = (e) => {
		const brandId = e.target.value || null; // Set to null if no brand is selected
		dispatch(setBrandId(brandId));
	};

	return (
		<div className="flex items-center justify-end pt-10 lora h-16 px-6 bg-white md:max-w-[170vh] mx-auto md:ml-[260px] md:w-[calc(100%-240px)]">
			<div className="flex items-center space-x-8">
				<div className="hidden md:flex gap-10">
					<Link
						to="/"
						onClick={toggleAddChefModal}
						className="flex items-center gap-2 px-4 py-2 text-white bg-[#5B21BD] rounded-[10px] cursor-pointer"
					>
						<PiChefHatFill />
						<span className="font-medium">Add Chefs</span>
						<IoMdAdd />
					</Link>

					<div className="flex items-center gap-2 text-[#5B21BD] px-4 py-2 border-[#CCBAEB] border rounded-[10px] font-medium">
						<PiChefHatFill className="text-2xl" />
						<select
							name="brand"
							id="brand"
							className="outline-none bg-transparent text-[#5B21BD] font-medium"
							onChange={handleBrandChange}
						// value={selectedBrandId}
						>
							<option value="" >
								Select a Brand
							</option>
							{brands.map((brand) => (
								<option
									key={brand.brand_id}
									value={brand.brand_id}
								>
									{brand.brand_name}
								</option>
							))}
						</select>
					</div>
				</div>

				<NavLink to="/dashboard/user_notifications">
					<div className="relative">
						<button className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-200 cursor-pointer">
							<GoBellFill className="h-7 w-7 text-[#5B21BD]" />
						</button>
						<div className="absolute text-[10px] p-[5px] top-[6px] right-[10px] bg-gray-200 rounded-full"></div>
					</div>
				</NavLink>

				<div className="flex items-center space-x-2">
					<div className="mr-4">
						{userData?.first_name}



					</div>
					<img
						src={userImageUrl}
						alt="User profile"
						className="h-10 w-10 rounded-full hidden md:block"
					/>
					<span className="text-[17px] font-medium  text-black">
						{userName}
					</span>

				</div>
			</div>
		</div>
	);
};

export default UserDashboardNavbar;






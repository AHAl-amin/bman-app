import { useEffect, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "../../../Rudux/feature/ApiSlice";
import { useForm } from "react-hook-form";

import { toast, Toaster } from "react-hot-toast";

function AdminDashboardSettingPrivecy() {
	const { data: profileList } = useGetProfileQuery();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		photo: "https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg",
	});

	useEffect(() => {
		if (profileList?.user) {
			setFormData({
				firstName: profileList.user.first_name || "",
				lastName: profileList.user.last_name || "",
				email: profileList.user.email || "",
				phone: profileList.user.phone || "",
				photo:
					profileList.user.image
						? `https://bmn1212.duckdns.org${profileList?.user?.image}`
						: "https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg",
			});
		}
	}, [profileList]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: formData });
	useEffect(() => {
		if (formData.firstName) reset(formData);
	}, [formData, reset]);

	const [submitUpdate, { isLoading }] = useUpdateProfileMutation();

	const onSubmit = async (data) => {
		try {
			console.log(data);
			const formDataToSubmit = new FormData();
			formDataToSubmit.append("first_name", data.firstName);
			formDataToSubmit.append("last_name", data.lastName);
			formDataToSubmit.append("email", data.email);
			formDataToSubmit.append("phone", data.phone);
			if (data.photo[0] instanceof File) {
				formDataToSubmit.append("image", data.photo[0]);
			}

			const response = await submitUpdate(formDataToSubmit).unwrap();
			toast.success(response?.detail || "Profile updated successfully!");
		} catch (err) {
			console.error("Error submitting form data:", err);
		}
	};
	return (
		<div className="px-10 py-4 lora">
			<h1 className="text-[#5B21BD] text-[45px] font-semibold">
				Profile information
			</h1>
			<p className="text-[#A2A2A2] text-[20px] capitalize">
				Update your information and public details
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className=" p-6  w-full ">
					<div className="flex justify-center mb-4">
						<img
							src={formData.photo}
							alt="Profile"
							className="w-24 h-24 rounded-full object-cover border-2 "
						/>
					</div>

					<div className="flex justify-center mb-4">
						<label className="text-[#5B21BD] border border-[#5B21BD] p-2 rounded-[10px] cursor-pointer flex items-center">
							<span className="mr-2 text-[20px]">
								Change Photo
							</span>
							<MdOutlineCameraAlt />
							<input
								type="file"
								accept="image/*"
								className="hidden"
								{...register("photo")}
							/>
						</label>
					</div>

					<div className="py-10 ">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4 text-[20px]">
							<div>
								<label className="block text-sm font-medium text-[#5B21BD] text-[20px]">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									placeholder="Enter your first name"
									className="mt-1 p-2 w-full  rounded-md focus:outline-none border border-[#5B21BD] bg-[#FFFFFF]"
									{...register("firstName", {
										required: "First name is required",
									})}
								/>
								{errors.firstName && (
									<p className="text-red-500 text-sm mt-1">
										{errors.firstName.message}
									</p>
								)}
							</div>
							<div>
								<label className="block font-medium text-[#5B21BD] text-[20px]">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									placeholder="Enter your last name"
									className="mt-1 p-2 w-full  rounded-md focus:outline-none border border-[#5B21BD]  bg-[#FFFFFF]"
									{...register("lastName", {
										required: "Last Name is required",
									})}
								/>
								{errors.lastName && (
									<p className="text-red-500 text-sm mt-1">
										{errors.lastName.message}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
							<div className="">
								<label className="block text-[#5B21BD] text-[20px] font-medium">
									Email Address
								</label>
								<input
									type="email"
									readOnly
									placeholder="Enter your email"
									name="email"
									className="mt-1 p-2 w-full  rounded-md focus:outline-none border border-[#5B21BD]  bg-[#FFFFFF]"
									{...register("email", {
										required: "Email is required",
									})}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
							<div>
								<label className="block text-[#5B21BD] text-[20px] font-medium ">
									Phone
								</label>
								<input
									type="tel"
									name="phone"
									placeholder="Enter here"
									className="mt-1 p-2 w-full  rounded-md focus:outline-none border border-[#5B21BD]  bg-[#FFFFFF]"
									{...register("phone", {
										required: "Phone is required",
									})}
								/>
								{errors.phone && (
									<p className="text-red-500 text-sm mt-1">
										{errors.phone.message}
									</p>
								)}
							</div>
						</div>
					</div>
					<div>
						<button
							type="submit"
							disabled={isLoading}
							className={`bg-[#5B21BD] text-white rounded-lg px-6 py-2 mt-4 text-lg font-semibold transition-opacity ${isLoading
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-[#4A1A9C]"
								}`}
						>
							{isLoading ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</div>
			</form>

			<Toaster position="top-right" />
		</div>
	);
}

export default AdminDashboardSettingPrivecy;









// import React from 'react'
// import { MdOutlineCameraAlt } from 'react-icons/md';

// function AdminDashboardSettingPrivecy() {

//     const [formData, setFormData] = React.useState({
//         firstName: "Jane",
//         lastName: "Doe",
//         email: "pappyroy6383@gmail.com",
//         phone: "0140536383",
//         photo: "https://via.placeholder.com/100"
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setFormData({ ...formData, photo: event.target.result });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert("Profile updated: " + JSON.stringify(formData));
//     };
//     return (


//         <div className='px-10 py-4 lora'>
//             <h1 className="text-[#5B21BD] text-[45px] font-semibold">Profile Information</h1>
//             <p className="text-[#A2A2A2] text-[20px] capitalize">
//                 Update your information and public details
//             </p>

//             <form action="">
//                 <div className=" p-6  w-full ">


//                     <div className="flex justify-center mb-4">
//                         <img
//                             // src={formData.photo}
//                             src='https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg'
//                             alt="Profile"
//                             className="w-24 h-24 rounded-full object-cover border-2 "
//                         />
//                     </div>

//                     <div className="flex justify-center mb-4">
//                         <label className="text-[#5B21BD] border border-[#5B21BD] p-2 rounded-[10px] cursor-pointer flex items-center">
//                             <span className="mr-2 text-[20px]">Change Photo</span>
//                             <MdOutlineCameraAlt />
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={handlePhotoChange}

//                             />
//                         </label>
//                     </div>


//                     <div className='py-10 '>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4 text-[20px]">
//                             <div>
//                                 <label className="block text-sm font-medium text-[#5B21BD] text-[20px]">First Name</label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     placeholder='Enter your first name'
//                                     // value={formData.firstName}
//                                     onChange={handleInputChange}
//                                     className="mt-1 p-2 w-full border border-[#5B21BD] rounded-md focus:outline-none bg-[#FFFFFF]"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium text-[#5B21BD] text-[20px]">Last Name</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     placeholder='Enter your last name'
//                                     // value={formData.lastName}
//                                     onChange={handleInputChange}
//                                     className="mt-1 p-2 w-full border border-[#5B21BD] rounded-md focus:outline-none focus:ring-2  bg-[#FFFFFF]"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-[#5B21BD] text-[20px]">Bio</label>
//                             <textarea name="" id="" placeholder='Enter your bio' className='w-full p-2 text-xl h-[100px] bg-[#FFFFFF] border border-[#5B21BD] rounded-md'></textarea>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
//                             <div className=''>
//                                 <label className="block text-[#5B21BD] text-[20px] font-medium">Email Address</label>
//                                 <input
//                                     type="email"
//                                     placeholder='Enter your email'
//                                     name="email"
//                                     // value={formData.email}
//                                     onChange={handleInputChange}
//                                     className="mt-1 p-2 w-full border border-[#5B21BD] rounded-md focus:outline-none  bg-[#FFFFFF]"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-[#5B21BD] text-[20px] font-medium ">Phone Number</label>
//                                 <input
//                                     type="tel"
//                                     name="phone"
//                                     placeholder='Enter your number'
//                                     // value={formData.phone}
//                                     onChange={handleInputChange}
//                                     className="mt-1 p-2 w-full border border-[#5B21BD] rounded-md focus:outline-none  bg-[#FFFFFF]"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <button
//                             onClick={handleSubmit}
//                             className=" bg-[#5B21BD] text-[20px] text-white p-2 rounded-[10px]  px-4"
//                         >
//                             Save Changes
//                         </button>
//                     </div>

//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AdminDashboardSettingPrivecy
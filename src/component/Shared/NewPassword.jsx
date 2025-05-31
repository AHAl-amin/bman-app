// import { useState } from 'react';
// import login_img from '../../assets/image/user_login_img.jpg';
// import login_img2 from '../../assets/image/Admin_login_img.png';

// import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
// import { Link, useNavigate } from 'react-router-dom';
// import { useConfrimPasswordMutation } from '../../Rudux/feature/authApi';

// function NewPassword() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
    
//     const [passwordFocused, setPasswordFocused] = useState(false);
//     const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     //  const [confrimPassword, { isLoading }] = useConfrimPasswordMutation();

//        const [confirmPasswordMutation, { isLoading: isConfirming }] = useConfrimPasswordMutation();
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError('');

//         // Validation
//         if ( !password || !confirmPassword) {
//             setError('Please fill in all fields');
//             return;
//         }
//  const email = localStorage.getItem("email");

//         // Email validation
        
//         if (!email) {
//             setError('Email not found!');
//             return;
//         }

//         // Password match validation
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }

//         const passwordData = {
//             new_password: password,
//             email: email,
//         };

    

//      try {
//             const response = await confirmPasswordMutation(passwordData).unwrap();

//             showToast("Password updated successfully!", "success");

//             setTimeout(() => navigate("/login"), 1500);
//         } catch (error) {
//             const errorMessage = error?.data?.message || "Failed to update password. Please try again.";
//             showToast(errorMessage, "error");
//             console.error("Password update error:", error);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     // 
//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     return (
//         <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito lora">
//             <div className="flex justify-center items-center  md:h-screen md:w-1/2 ">
//                 <img
//                     src={login_img}
//                     alt="Registration illustration"
//                     className="w-full h-full "
//                 />
//             </div>
//             <div className="md:w-1/2 lg:px-40">
//                 <div className='flex justify-center mb-10'>
//                     <img src={login_img2} alt="image logo" className='w-[150px] h-[150px]' />
//                 </div>
//                 <div className="mb-6">
//                     <p className="text-[34px] text-center font-semibold text-[#5B21BD]">
//                         Set New Password
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">


//                     <div className="relative">
//                         <label className="block text-[#5B21BD] mb-2">Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter your password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 onFocus={() => setPasswordFocused(true)}
//                                 onBlur={() => setPasswordFocused(password !== '')}
//                                 className={`w-full px-4 py-2 border bg-[#F8FCFF] border-[#5B21BD] rounded-[8px]  pr-10 ${passwordFocused ? 'ring-2 ring-[#5B21BD]' : ''
//                                     }`}
//                                 required
//                             />

//                             <button
//                                 type="button"
//                                 onClick={togglePasswordVisibility}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B21BD] cursor-pointer"
//                             >
//                                 {showPassword ? (
//                                     <IoEyeOffOutline size={20} />
//                                 ) : (
//                                     <IoEyeOutline size={20} />
//                                 )}
//                             </button>
//                         </div>
//                     </div>

//                     <div className="relative">
//                         <label className="block text-[#5B21BD] mb-2">Confirm Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 placeholder="Enter your confirm password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 onFocus={() => setConfirmPasswordFocused(true)}
//                                 onBlur={() => setConfirmPasswordFocused(confirmPassword !== '')}
//                                 className={`w-full px-4 py-2 border bg-[#F8FCFF] border-[#5B21BD] rounded-[8px]  pr-10 ${confirmPasswordFocused ? 'ring-2 ring-[#5B21BD]' : ''
//                                     }`}
//                                 required
//                             />

//                             <button
//                                 type="button"
//                                 onClick={toggleConfirmPasswordVisibility}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B21BD] cursor-pointer"
//                             >
//                                 {showConfirmPassword ? (
//                                     <IoEyeOffOutline size={20} />
//                                 ) : (
//                                     <IoEyeOutline size={20} />
//                                 )}
//                             </button>
//                         </div>
//                     </div>


//                     <div className='flex justify-center'>
//                         <Link to='/password_change_succesfull'
//                             type="submit"
//                             className="bg-[#5B21BD] text-[#FFFFFF] rounded-[8px] px-6 py-2 mt-4 cursor-pointer "
//                         >
//                             Send
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default NewPassword;





import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import {  useNavigate } from 'react-router-dom';


import { useState } from 'react';
import login_img from '../../assets/image/user_login_img.jpg';
import login_img2 from '../../assets/image/Admin_login_img.png';
import { useNewPasswordMutation } from '../../Rudux/feature/authApi';
import { toast, Toaster } from 'react-hot-toast';

function NewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [NewPassword, { isLoading: isConfirming }] = useNewPasswordMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!password || !confirmPassword) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields', { position: 'top-right', autoClose: 3000 });
            return;
        }

        const email = localStorage.getItem("forgetPasswordEmail");
        if (!email) {
            setError('Email not found!');
            toast.error('Email not found!', { position: 'top-right', autoClose: 3000 });
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match', { position: 'top-right', autoClose: 3000 });
            return;
        }

        const passwordData = {
            new_password: password,
            email: email,
        };

        try {
            await NewPassword(passwordData).unwrap();
            toast.success('Password updated successfully!', { position: 'top-right', autoClose: 1500 });
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            const errorMessage = error?.data?.message || 'Failed to update password. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage, { position: 'top-right', autoClose: 3000 });
            console.error('Password update error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex items-center justify-between w-full min-h-screen gap-10 font-sans">
           
            <div className="hidden md:flex md:w-1/2 h-screen">
                <img
                    src={login_img}
                    alt="Registration illustration"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 lg:px-20 px-4 flex flex-col justify-center">
                <div className="flex justify-center mb-10">
                    <img src={login_img2} alt="Admin logo" className="w-[150px] h-[150px]" />
                </div>
                <div className="mb-6">
                    <h1 className="text-[34px] text-center font-semibold text-purple-700">
                        Set New Password
                    </h1>
                </div>

              

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="block text-purple-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(password !== '')}
                                className={`w-full px-4 py-2 border bg-gray-50 border-purple-700 rounded-lg pr-10 focus:ring-2 focus:ring-purple-700 focus:outline-none ${passwordFocused ? 'ring-2 ring-purple-700' : ''}`}
                              
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700"
                            >
                                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-purple-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Enter your confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setConfirmPasswordFocused(true)}
                                onBlur={() => setConfirmPasswordFocused(confirmPassword !== '')}
                                className={`w-full px-4 py-2 border bg-gray-50 border-purple-700 rounded-lg pr-10 focus:ring-2 focus:ring-purple-700 focus:outline-none ${confirmPasswordFocused ? 'ring-2 ring-purple-700' : ''}`}
                               
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700"
                            >
                                {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isConfirming}
                            className={`bg-purple-700 text-white rounded-lg px-6 py-2 mt-4 ${isConfirming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-800'}`}
                        >
                            {isConfirming ? 'Updating...' : 'Send'}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position='top-right'/>
        </div>
    );
}

export default NewPassword;
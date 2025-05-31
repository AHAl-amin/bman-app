



import React, { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { GoGraph } from 'react-icons/go';
import { PiChefHatFill } from 'react-icons/pi';
import { RiBox3Fill } from 'react-icons/ri';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

// Chart data with random values between 5000 and 30000
const lineChartData = [
    { name: 'Jan', value: 12640 },
    { name: 'Feb', value: 28950 },
    { name: 'Mar', value: 15870 },
    { name: 'Apr', value: 23980 },
    { name: 'May', value: 19420 },
    { name: 'Jun', value: 26890 },
    { name: 'Jul', value: 22110 },
    { name: 'Aug', value: 17550 },
    { name: 'Sep', value: 29300 },
    { name: 'Oct', value: 14730 },
    { name: 'Nov', value: 18020 },
    { name: 'Dec', value: 25560 },
];

const topRecipes = [
    { name: "Chocolate Soufflé", width: "80%" },
    { name: "Vanilla Bean Ice Cream", width: "60%" },
    { name: "Dark Chocolate Truffles", width: "50%" },
    { name: "Strawberry Macarons", width: "40%" },
];


const feedback = [
    {
        recipe: "Chocolate soufflé",
        rating: 5,
        comment: "Amazing recipe! I substituted dairy milk with almond milk and it still turned out perfect!"
    },
    {
        recipe: "Chocolate soufflé",
        rating: 5,
        comment: "Perfectly rich and fluffy, my guests loved it!"
    },
    {
        recipe: "Chocolate soufflé",
        rating: 5,
        comment: "Great instructions, very easy to follow!"
    },
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];



function ChefDashboardPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('October');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="px-10 py-6 lora">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Card Template */}
                {[
                    {
                        title: "Total AI Interactions",
                        value: "40,689",
                        icon: <PiChefHatFill className="text-[#5B21BD] text-[25px]" />,
                        note: "+15",
                        subtext: "From last month"
                    },
                    {
                        title: "Active Subscribers",
                        value: "456",
                        icon: <FaUserFriends className="text-[#5B21BD] text-[25px]" />,
                        note: "3%",
                        subtext: "From last month"
                    },
                    {
                        title: "Total Recipes",
                        value: "50",
                        icon: <RiBox3Fill className="text-[#5B21BD] text-[25px]" />,
                        note: "3+",
                        subtext: "New this week"
                    },
                    {
                        title: "Monthly revenue",
                        value: "$4,569",
                        icon: <GoGraph className="text-[#5B21BD] text-[25px]" />,
                        note: "10%",
                        subtext: "From last month"
                    }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg space-y-4 border border-[#D9D9D9]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm">{item.title}</p>
                                <p className="text-gray-300 text-3xl font-bold">{item.value}</p>
                            </div>
                            <div className="bg-[#8280ff1c] px-4 py-4 rounded-full">
                                {item.icon}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 text-gray-300 ">
                                <FaArrowTrendUp />
                                <span>{item.note}</span>
                            </div>
                            <span className="text-gray-500">{item.subtext}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Recipes & Feedback */}
            <div className="flex flex-col md:flex-row gap-6 mt-10">
                {/* Top Recipes */}
                <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-400 mb-1">Top Queried Recipes</h2>
                    <p className="text-sm text-gray-400 mb-4">The most popular recipes users are asking about</p>
                    <ul className="space-y-4">
                        {topRecipes.map((recipe, index) => (
                            <li key={index} className="flex items-center">
                                <span className="w-48 text-gray-400 capitalize">{recipe.name}</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#5a21bd9f]" style={{ width: recipe.width }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Feedback */}
                <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-400 mb-1">Recent Feedback</h2>
                    <p className="text-sm text-gray-400 mb-4">Latest User Comments On Your Recipes</p>
                    <ul className="space-y-4">
                        {feedback.map((item, index) => (
                            <li key={index} className="border-b pb-4 border-gray-300">
                                <div className="flex items-center mb-2">
                                    <span className="text-gray-400 font-medium capitalize">{item.recipe}</span>
                                    <div className="ml-2 flex">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.312 9.397c-.783-.57-.381-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">{item.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Chart Section */}
            <div className='mt-10 shadow bg-white rounded-xl p-4'>
                <div className='flex justify-between pb-6 relative'>
                    <p className='text-[28px] font-medium text-gray-400'>Monthly Revenue</p>
                    <div className='relative'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='border border-gray-400 rounded-[10px] text-gray-400  py-1 px-8'
                        >
                            {selectedMonth}
                        </button>
                        {isOpen && (
                            <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-400 text-gray-400 rounded-md shadow-md z-10'>
                                {months.map((month) => (
                                    <div
                                        key={month}
                                        onClick={() => {
                                            setSelectedMonth(month);
                                            setIsOpen(false);
                                        }}
                                        className='px-4 py-2 hover:bg-[#5B21BD] hover:text-white cursor-pointer'
                                    >
                                        {month}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Added fixed height to the chart container */}
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={lineChartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: darkMode ? "#D1D5DB" : "#6B7280" }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: darkMode ? "#D1D5DB" : "#6B7280" }}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className={`px-3 py-1 rounded shadow-md text-center ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-[#5B21BD] text-white'}`}>
                                                <p className="text-sm font-medium">${payload[0].value.toLocaleString()}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="50%" stopColor="#5B21BD" stopOpacity={0.8} />
                                    <stop offset="98%" stopColor="#5B21BD" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#5B21BD"
                                strokeWidth={2}
                                fill="url(#colorValue)"
                                dot={{ r: 4, fill: "#5B21BD", strokeWidth: 0 }}
                                activeDot={{ r: 6, fill: "#5B21BD", stroke: "#fff", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default ChefDashboardPage;





import { useEffect, useState } from "react";
import img from "../../assets/image/pricing_img.png"; // Light mode image
import img1 from "../../assets/image/pricing_img.png"; // Dark mode image
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { useDarkMode } from "../../context/ThemeContext"; // Import useDarkMode

const Subscribsion = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");
    

    const monthlyPlans = [
        {
            name: "BASIC",
            price: "$69",
            period: "/month",
            features: [
                "All UI Components",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
            ],
        },
        {
            name: "BASIC",
            price: "$79",
            period: "/month",
            features: [
                "All UI Components",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
            ],
        },
        {
            name: "PREMIUM",
            price: "$99",
            period: "/month",
            features: [
                "All UI Components",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
            ],
        },
    ];

    const yearlyPlans = [
        {
            name: "STARTER",
            price: "$599",
            period: "/year",
            features: [
                "All UI Components",
                "Use with Unlimited Projects",
                "Priority Support",
                "Use with Unlimited Projects",
                "All UI Components",
                "Use with Unlimited Projects",
            ],
        },
        {
            name: "BUSINESS",
            price: "$699",
            period: "/year",
            features: [
                "All UI Components",
                "Use with Unlimited Projects",
                "Priority Support",
                "Advanced Analytics",
                "All UI Components",
                "Advanced Analytics",
            ],
        },
        {
            name: "ENTERPRISE",
            price: "$899",
            period: "/year",
            features: [
                "All UI Components",
                "Use with Unlimited Projects",
                "24/7 Premium Support",
                "Advanced Analytics",
                "Custom Integrations",
                "Advanced Analytics",
            ],
        },
    ];

    const cardContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        show: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
        exit: { y: -50, opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    };

    useEffect(()=>{

    },[])
    return (
        <div id="pricing" className="  md:px-4 ">
            <div className="max-w-5xl mx-auto">


            <div className="text-center mb-6 md:mb-0">
                    <h3 className="text-[#2D4162] font-medium mb-2 text-sm md:text-2xl">
                        Our Powerful Features
                    </h3>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#5B21BD] mb-3 md:mb-4 capitalize">
                    Choose your subscription
                    </h1>
                    <p className="text-gray-600 text-[20px] max-w-full md:max-w-2xl mx-auto text-xs md:text-base">
                        There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
                    </p>
                </div>

                {/* Toggle Switch */}
                {/* <div className="flex justify-center items-center gap-3 md:gap-4 mb-6 md:mb-12">
                    <span
                        className={`font-medium text-sm md:text-base  ${billingCycle === "monthly"
                            ? "text-blue-800 dark:text-blue-400"
                            : "text-slate-500 dark:text-gray-400"
                            }`}
                    >
                        Monthly
                    </span>
                    <button
                        className="w-12 md:w-16 h-6 md:h- bg-[#EFE9F8] dark:bg-gray-700 rounded-full p-1  flex items-center cursor-pointer"
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                    >
                        <motion.div
                            className="w-4 md:w-6 h-4 md:h-6 rounded-full bg-blue-800 dark:bg-blue-500 shadow-md  ml-1"
                            animate={{ x: billingCycle === "yearly" ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span
                        className={`font-medium text-sm md:text-base ${billingCycle === "yearly"
                            ? "text-blue-800 dark:text-blue-400"
                            : "text-slate-500 dark:text-gray-400"
                            }`}
                    >
                        Yearly
                    </span>
                </div> */}

                {/* Pricing Cards Container */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {billingCycle === "monthly" ? (
                            <motion.div
                                key="monthly"
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-14 w-full"
                                variants={cardContainerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                {monthlyPlans.map((plan, index) => (
                                    <motion.div
                                        key={`monthly-${index}`}
                                        className="bg-white mt-6 hover:bg-[#EFE9F8] transition duration-500  rounded-3xl shadow-lg overflow-hidden w-full min-h-[450px] md:min-h-[460px] flex flex-col"
                                        variants={cardVariants}
                                    >
                                        <div className="p-4 md:p-8 flex flex-col flex-grow">
                                            <h2 className="text-lg md:text-2xl font-bold  text-[#5B21BD] mb-4 md:mb-8 text-center">
                                                {plan.name}
                                            </h2>
                                            <div className="md:-mx-8 md:p-8 text-gray-100 dark:text-gray-100 md:mb-8">
                                                <img
                                                    src={img} // Conditionally render img1 in dark mode, img in light mode
                                                    className="absolute hidden md:block md:h-32 md:top-34 md:-ml-[70px]"
                                                    alt=""
                                                />
                                                <div className="flex items-baseline justify-start">
                                                    <span className="md:text-5xl md:font-bold z-30 capitalize">{plan.price}</span>
                                                    <span className="md:text-xl ml-2 z-30 capitalize">{plan.period}</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 md:space-y-4 flex-grow">
                                                {plan.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-center">
                                                        <Check className="h-4 w-4 md:h-5 md:w-5 p-[2px] md:p-[3px] rounded-ful bg-[#EFE9F8]   mr-2" />
                                                        <span className=" text-[#5B21BD] text-xs md:text-base">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="mt-4 md:mt-8 w-full bg-[#5B21BD]  text-white py-2 md:py-3 px-4 md:px-6 rounded-full font-medium flex items-center justify-center transition-colors duration-300 text-sm md:text-base cursor-pointer">
                                                Get Started <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="yearly"
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-14 w-full"
                                variants={cardContainerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                {yearlyPlans.map((plan, index) => (
                                    <motion.div
                                        key={`yearly-${index}`}
                                        className="bg-white hover:bg-[#EFE9F8] transition duration-500  rounded-3xl shadow-lg overflow-hidden w-full min-h-[450px] md:min-h-[500px] flex flex-col"
                                        variants={cardVariants}
                                    >
                                        <div className="p-4 md:p-8 flex flex-col flex-grow">
                                            <h2 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-gray-100 mb-4 md:mb-8 text-center">
                                                {plan.name}
                                            </h2>
                                            <div className="md:-mx-8 md:p-8 text-gray-100 dark:text-gray-100 md:mb-8">
                                                <img
                                                    src={darkMode ? img1 : img} // Conditionally render img1 in dark mode, img in light mode
                                                    className="absolute hidden md:block md:h-32 md:top-28 md:-ml-[70px]"
                                                    alt=""
                                                />
                                                <div className="flex items-baseline justify-start">
                                                    <span className="md:text-5xl md:font-bold z-30">{plan.price}</span>
                                                    <span className="md:text-xl ml-2 z-30">{plan.period}</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 md:space-y-4 flex-grow">
                                                {plan.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-center">
                                                        <Check className="h-4 w-4 md:h-5 md:w-5 p-[2px] md:p-[3px] rounded-ful bg-[#EFE9F8] dark:bg-gray-600 dark:text-blue-400 mr-2" />
                                                        <span className="text-slate-700 dark:text-gray-300 text-xs md:text-base">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="mt-4 md:mt-8 w-full bg-[#5B21BD]  text-white py-2 md:py-3 px-4 md:px-6 rounded-full font-medium flex items-center justify-center transition-colors duration-300 text-sm md:text-base cursor-pointer">
                                                Get Started <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* <div className="p-6 bg-gray-100  flex justify-center items-center">
                    <div className=" w-full py-10 space-y-4">
                        <h1 className="text-[34px] font-semibold text-[#0077B6] mb-2">Annual Discount Settings</h1>
                        <p className="text-gray-500 mb-6">Configure discounts for annual subscriptions</p>

                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block text-[#0077B6] mb-2">Basic Plan Discount (%)</label>
                                <input
                                    type="number"
                                    defaultValue="15"
                                    className="w-full p-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[#0077B6] mb-2">Professional Plan Discount (%)</label>
                                <input
                                    type="number"
                                    defaultValue="20"
                                    className="w-full p-2 border border-gray-300  bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-[#0077B6] mb-2">Premium Plan Discount (%)</label>
                                <input
                                    type="number"
                                    defaultValue="15"
                                    className="w-full p-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="bg-[#0077B6] cursor-pointer text-white px-4 py-2 rounded-lg">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Subscribsion;
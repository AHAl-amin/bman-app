


import img from "../../assets/image/pricing_img.png";
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMainSubscriptionQuery } from "../../Rudux/feature/ApiSlice";
import PropTypes from "prop-types";

const Subscribsion = ({ chefId }) => {
  const { data: getMainSubscription, isLoading, isError } = useGetMainSubscriptionQuery(chefId);

  console.log(getMainSubscription,"chef_data_here........................................")

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

  const plans = getMainSubscription?.data || [];

  return (
    <div id="pricing" className="md:px-4">
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

        <div className="relative mt-6">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500">Failed to load subscription plans.</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="plans"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-14 w-full"
                variants={cardContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {plans.map((plan) => (
                  <motion.div
                    key={`plan-${plan.id}`}
                    className="bg-white hover:bg-[#EFE9F8] transition duration-500 rounded-3xl shadow-lg  w-full min-h-[450px] flex flex-col"
                    variants={cardVariants}
                  >
                    <div className="p-4 md:p-8 flex flex-col flex-grow">
                      <h2 className="text-lg md:text-2xl font-bold text-[#5B21BD] mb-4 md:mb-8 text-center">
                        {plan.name}
                      </h2>
                      <div className="md:-mx-8 md:p-8 text-gray-100 dark:text-gray-100 md:mb-8 relative">
                        <img
                          src={img}
                          className="absolute hidden md:block md:h-32 md:top-2 md:-ml-[70px]"
                          alt=""
                        />
                        <div className="flex items-baseline justify-start z-10 relative">
                          <span className="md:text-3xl font-bold">${parseFloat(plan.price).toFixed(2)}</span>
                          <span className="ml-2 md:text-xl">/month</span>
                        </div>
                      </div>
                      <ul className="space-y-2 md:space-y-4 flex-grow">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 md:h-5 md:w-5 p-[2px] bg-[#EFE9F8] mr-2" />
                          <span className="text-[#5B21BD] text-xs md:text-base">
                            Storage: {plan.storage_gb} GB
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 md:h-5 md:w-5 p-[2px] bg-[#EFE9F8] mr-2" />
                          <span className="text-[#5B21BD] text-xs md:text-base">
                            Upload Limit: {plan.upload_limit}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 md:h-5 md:w-5 p-[2px] bg-[#EFE9F8] mr-2" />
                          <span className="text-[#5B21BD] text-xs md:text-base">
                            Recipes Allowed: {plan.recipe_limit}
                          </span>
                        </li>
                      </ul>
                      <button className="mt-4 md:mt-8 w-full bg-[#5B21BD] text-white py-2 md:py-3 px-4 md:px-6 rounded-full font-medium flex items-center justify-center transition-colors duration-300 text-sm md:text-base cursor-pointer">
                        Get Started <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};
Subscribsion.propTypes = {
  chefId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Subscribsion;

"use client";

import { motion } from "framer-motion";

const UseOfFunds = () => {
  const useOfFundsData = [
    {
      percentage: 40,
      start: 0,
      title: "Product Development:",
      description: "Platform, blockchain integration, testing",
    },
    {
      percentage: 25,
      start: 40,
      title: "Compliance & Legal:",
      description: "Smart contract audits, securities counsel",
    },
    {
      percentage: 20,
      start: 65,
      title: "Marketing & GTM:",
      description: "Founder/investor acquisition campaigns",
    },
    {
      percentage: 15,
      start: 85,
      title: "Operations:",
      description: "KYC stack, hosting, platform support",
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-10">
      {useOfFundsData.map((item, index) => (
        <motion.div
          key={index}
          className="relative flex items-center gap-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex-2 relative h-[60px]">
            <div className="absolute inset-0 pointer-events-none z-10">
              {[40, 65, 85, 100].map((percent) => (
                <div
                  key={percent}
                  className="absolute top-0 bottom-0 border-l border-[#0FE2D499]"
                  style={{ left: `${percent}%` }}
                />
              ))}
            </div>

            <div className="relative h-full bg-[#0FE2D440]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#0FE2D4] flex items-center justify-center"
                style={{ left: `${item.start}%`, width: `${item.percentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{
                  duration: 1,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <motion.span
                  className="text-black font-bold text-base whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {item.percentage}%
                </motion.span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex flex-col flex-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <h3 className="text-white font-bold text-base whitespace-nowrap">
              {item.title}
            </h3>
            <p className="text-white text-sm">{item.description}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default UseOfFunds;

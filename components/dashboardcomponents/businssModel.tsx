"use client";

import { motion } from "framer-motion";

const BusinessModel = () => {
  const businessModelData = {
    issuerSide: [
      "$20/month SaaS subscriptions (compliance dashboard & governance alerts)",
      "$500 onboarding packages (C-Corp formation, tokenization setup)",
      "$300 annual listing upgrades (visibility boosts)",
    ],
    investorSide: [
      "$5-15/year for investor dashboards, tax PDFs, and alerts",
      "0.5% transaction fee on post-QSBS secondary trades",
      "$30/year premium analytics & syndicate dashboards",
    ],
  };
  return (
    <motion.div
      className="flex flex-wrap gap-8 text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3
          className="bg-[#FFFFFF0A] text-white rounded-xl px-6 py-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Issuer-Side Revenue
        </motion.h3>
        <ul className="space-y-3">
          {businessModelData.issuerSide.map((item: string, index: number) => (
            <motion.li
              key={index}
              className="text-white flex items-start border-[#212A3899] border-b px-6 py-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <span className="mr-2">•</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3
          className="bg-[#FFFFFF0A] text-white rounded-xl px-6 py-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Investor-Side Revenue
        </motion.h3>
        <ul className="space-y-3">
          {businessModelData.investorSide.map((item: string, index: number) => (
            <motion.li
              key={index}
              className="text-white flex items-start border-[#212A3899] border-b px-6 py-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <span className="text-[#0FE2D4] mr-2">•</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};
export default BusinessModel;

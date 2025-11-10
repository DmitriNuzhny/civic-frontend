"use client";

import { motion } from "framer-motion";

const Highlight = () => {
  const highlightsData = [
    { label: "Valuation (FMV)", value: "$31,557,000 (Eqvista, July 2025)" },
    {
      label: "QSBS Status",
      value: "Confirmed Qualified Small Business under IRC §1202",
    },
    { label: "Entity Type", value: "U.S. C-Corporation" },
    { label: "Gross Assets (as of Mar 31, 2025)", value: "$13,425" },
    {
      label: "Tax Benefit",
      value: "100% capital gains exclusion after 5-year hold",
    },
    { label: "Target Raise (Seed Round)", value: "$1,000,000" },
    { label: "Price per Share", value: "$2.66" },
    { label: "Ownership Offered", value: "15%" },
    { label: "Post-Money Valuation", value: "$36.5M" },
    {
      label: "Investor Type",
      value: "Accredited investors (QSBS-qualified equity)",
    },
  ];
  return (
    <div className="flex flex-col">
      <motion.div
        className="flex bg-[#FFFFFF0A] rounded-xl px-6 py-3 text-lg text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="flex-1">Details</p>
        <p className="flex-1">Metric</p>
      </motion.div>
      {highlightsData.map((item, index) => (
        <motion.div
          key={index}
          className="flex border-[#212A3899] border-b px-6 py-3 text-lg text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <span className="flex-1">{item.label}</span>
          <span className="flex-1">{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
};
export default Highlight;

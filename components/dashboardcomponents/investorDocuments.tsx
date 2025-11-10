"use client";

import { motion } from "framer-motion";
import { PdfIcon } from "../icons/dashboardIcons/pdfIcon";

const InvestorDocuments = () => {
  const investorDocuments = [
    "2025 Valuation Report - Eqvista",
    "QSBS Qualification Letter - Eqvista",
    "Founders Narrative",
    "Business Presentation",
  ];
  return (
    <div className="flex flex-col gap-4 text-lg">
      {investorDocuments.map((doc, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ x: 5 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PdfIcon className="w-10! h-10!" />
          </motion.div>
          <motion.a
            href="#"
            className="text-white underline transition-colors"
            whileHover={{ color: "#0FE2D4" }}
          >
            {doc}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
};
export default InvestorDocuments;

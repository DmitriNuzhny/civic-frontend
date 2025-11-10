"use client";

import { motion } from "framer-motion";
import { DashboardLogo } from "../icons/dashboardIcons/dashboardLogo";
import { LinkedInIcon } from "../icons/dashboardIcons/linkedInIcon";
import { XIcon } from "../icons/dashboardIcons/xIcon";
import { RedditIcon } from "../icons/dashboardIcons/redditIcon";
import { InstagramIcon } from "../icons/dashboardIcons/instagramIcon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Overview = () => {
  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="border-b border-[#384051]"
        variants={itemVariants}
      >
        <motion.p
          className="w-fit text-[#0FE2D4] text-lg border-b border-[#0FE2D4] p-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          OVERVIEW
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-wrap gap-10">
          {/* Left Column - Company Info */}
          <motion.div
            className="flex flex-1 flex-col gap-6 justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="flex flex-col gap-1 text-white text-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <div className="float-left w-sm mr-2">
                    <DashboardLogo className="w-full! h-full!" />
                  </div>
                  <p>
                    leverages smart contracts, on a decentralized ledger, to
                    create more transparent, secure, and efficient crowdfunding
                    for entrepreneurs. The platform use smart contracts to
                    manage full equity issuance on an immutably recorded
                    blockchain. This enhances trust between founders & backers,
                    allows for greater accessibility, and reduces fees. Built on
                    Avalanche blockchain technology, CivicForge leverages
                    high-speed, low-cost transactions and proof-of-stake
                    consensus for security and scalability.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                { Icon: LinkedInIcon, index: 0 },
                { Icon: XIcon, index: 1 },
                { Icon: RedditIcon, index: 2 },
                { Icon: InstagramIcon, index: 3 },
              ].map(({ Icon, index }) => (
                <motion.button
                  key={index}
                  className="flex justify-center items-center bg-[#212A38] hover:bg-[#212A38]/80 border border-[#384051] p-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Icon className="w-6 h-6 cursor-pointer" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="flex justify-center" variants={itemVariants}>
            <video
              src="/dashboard.mp4"
              className="w-full h-auto max-w-[800px] rounded-xl"
              controls
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-wrap gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex-1 flex flex-col gap-6">
            {[
              [
                { label: "Incorporated", value: "October 28, 2024" },
                { label: "Status", value: "Qualified Small Business (QSBS)" },
              ],
              [
                { label: "Headquarters", value: "Centreville, Virginia" },
                {
                  label: "Industry",
                  value: "Fintech / Blockchain Infrastructure",
                },
              ],
              [
                { label: "Ticker", value: "CF" },
                { label: "Valuation", value: "$31.6 Million" },
              ],
            ].map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + rowIndex * 0.1 }}
              >
                {row.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="flex-1 flex flex-col gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.95 + rowIndex * 0.1 + itemIndex * 0.05,
                    }}
                  >
                    <p className="text-[#AAAAAA] text-base">{item.label}</p>
                    <p className="text-white text-lg">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="flex-1 flex flex-col gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-[#AAAAAA] text-base">Platform includes</p>
            <div className="flex flex-col gap-3 text-white text-lg">
              {[
                "• Smart Contract Infrastructure: Enforces 5-year QSBS lock period",
                "• C-Corp Toolkits: Automated formation, compliance, and filings",
                "• Investor Wallet: QSBS countdowns, tax documents, liquidity alerts",
                "• Blockchain Ledger: Immutable record of share ownership",
                "• Integrated Payment Gateway: Fiat via Stripe or ACH",
              ].map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.3 + index * 0.1,
                  }}
                >
                  {item}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Overview;

"use client";

import { motion } from "framer-motion";

import Header from "@/components/dashboardcomponents/header";
import Footer from "@/components/footer";
import Overview from "@/components/dashboardcomponents/overview";
import TabNavigation from "@/components/dashboardcomponents/tabNavigation";
import TokenInformation from "@/components/dashboardcomponents/tokenInformation";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#030714] px-8">
      <div className="text-white max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
        </motion.div>
        <motion.div
          className="flex flex-col gap-[60px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Overview />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TabNavigation />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TokenInformation />
          </motion.div>
        </motion.div>
        <motion.div
          className="pt-10 pb-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

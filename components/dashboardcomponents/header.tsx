"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { LogoutIcon } from "../icons/dashboardIcons/logoutIcon";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center py-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
      </motion.div>
      <div className="flex items-center gap-10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image src="/avatar.png" alt="Avatar" width={60} height={60} />
          </motion.div>
          <div className="flex flex-col gap-2">
            <div className="text-white text-base font-medium">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-[#AAAAAA] text-sm">
              {user?.walletAddress
                ? `${user?.walletAddress.slice(
                    0,
                    8
                  )}...${user?.walletAddress.slice(-4)}`
                : "No wallet"}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            className="bg-[#212A38] hover:bg-[#212A38]/80 border border-[#384051] text-[#0FE2D4] h-12 rounded-lg transition-colors justify-start cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <LogoutIcon className="w-6! h-6!" />
              <span className="text-[#0FE2D4] text-base font-medium">
                Log Out
              </span>
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </header>
  );
};
export default Header;

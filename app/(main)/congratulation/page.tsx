"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from "@/lib/toast";

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

const CongratulationsPage = () => {
  const router = useRouter();
  const { user, isInitializing } = useAuth();

  useEffect(() => {
    if (isInitializing) {
      return;
    }

    // If user already has wallet AND is KYC verified, redirect to dashboard
    if (user?.walletAddress && user?.isKYCVerified) {
      router.replace("/dashboard");
    }
  }, [user?.walletAddress, user?.isKYCVerified, isInitializing, router]);

  const handleConnectWallet = () => {
    // Check KYC status before allowing wallet connection
    if (!user?.isKYCVerified) {
      showToast.error("Please complete KYC verification first.");
      router.push("/kyc-verification");
      return;
    }
    router.push("/connect-wallet");
  };

  const handleCreateWallet = () => {
    // Check KYC status before allowing wallet creation
    if (!user?.isKYCVerified) {
      showToast.error("Please complete KYC verification first.");
      router.push("/kyc-verification");
      return;
    }
    router.push("/create-wallet");
  };

  return (
    <motion.div
      className="relative min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[640px]"
      >
        <Card className="w-full bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
          <motion.div variants={itemVariants}>
            <CardHeader className="text-center flex flex-col gap-6 items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Image
                  src="/logo.svg"
                  alt="CivicForge"
                  width={192}
                  height={32}
                />
              </motion.div>
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h3
                  className="text-white text-2xl font-semibold"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  Congratulation!
                </motion.h3>
                <motion.h3
                  className="text-white text-2xl font-semibold"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  You have an account now.
                </motion.h3>
              </motion.div>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-10 h-full">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.p
                className="text-white text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col h-full justify-between gap-10"
              variants={itemVariants}
            >
              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleConnectWallet}
                    className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors cursor-pointer"
                  >
                    Connect a Wallet
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleCreateWallet}
                    className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors cursor-pointer"
                  >
                    Create a Wallet
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Link
                  href="/dashboard"
                  className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
                >
                  Skip for now
                </Link>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default CongratulationsPage;

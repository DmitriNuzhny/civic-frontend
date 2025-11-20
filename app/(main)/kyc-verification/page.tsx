"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";
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

const KycVerificationPage = () => {
  const router = useRouter();
  const { user, isInitializing, refreshSession } = useAuth();
  const [kycUrl, setKycUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isInitializing) {
      return;
    }

    // If already KYC verified, redirect to connect-wallet
    if (user?.isKYCVerified) {
      router.replace("/connect-wallet");
      return;
    }

    // If not authenticated, redirect to login
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Initiate KYC if not already initiated
    initiateKyc();
  }, [user, isInitializing, router]);

  const initiateKyc = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await apiClient.post<{
        message: string;
        kycUrl?: string;
        sessionId?: string;
        isKYCVerified?: boolean;
      }>("/kyc/initiate", {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      if (response.isKYCVerified) {
        // Refresh session to get updated KYC status
        await refreshSession();
        router.replace("/connect-wallet");
        return;
      }

      if (response.kycUrl) {
        setKycUrl(response.kycUrl);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to initiate KYC verification. Please try again.";
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToVerification = () => {
    if (kycUrl) {
      window.open(kycUrl, "_blank");
    }
  };

  const handleCheckStatus = async () => {
    try {
      // Check status from Didit API
      const response = await apiClient.get<{
        status: string;
        isKYCVerified: boolean;
        message: string;
      }>("/kyc/status");

      if (response.status === "Approved" && response.isKYCVerified) {
        // Refresh session to get updated user data
        await refreshSession();
        showToast.success("KYC verification completed!");
        router.push("/connect-wallet");
      } else if (response.status === "Declined") {
        showToast.error("KYC verification was declined. Please try again.");
      } else {
        showToast.custom("KYC verification is still in progress.", "info");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to check KYC verification status. Please try again.";
      showToast.error(message);
    }
  };

  if (isInitializing || isLoading) {
    return (
      <div className="min-h-screen bg-[#030714] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

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
              <motion.h1
                className="text-white text-3xl font-semibold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                KYC Verification Required
              </motion.h1>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-white text-base leading-relaxed">
                To connect or create a wallet, you need to complete KYC
                verification. This process includes:
              </p>
              <ul className="text-white text-sm mt-4 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-[#0FE2D4] mt-1">•</span>
                  <span>
                    Uploading a government-issued ID (driver&apos;s license,
                    passport, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FE2D4] mt-1">•</span>
                  <span>Taking a selfie to match with your ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FE2D4] mt-1">•</span>
                  <span>Completing identity verification</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleContinueToVerification}
                  disabled={!kycUrl}
                  className="w-full bg-[#0FE2D4] text-black rounded-md font-bold hover:bg-[#0FE2D4]/80 transition-colors shadow-lg shadow-[#0FE2D4]/20 hover:shadow-[#0FE2D4]/40 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                >
                  Start Verification
                </Button>
              </motion.div>
              <p className="text-[#AAAAAA] text-xs text-center">
                ⓘ You can continue on mobile by scanning the QR code on the
                verification page
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                onClick={handleCheckStatus}
                variant="outline"
                className="w-full h-10 bg-transparent border-[#384051] text-white hover:text-[#0FE2D4] hover:bg-[#0FE2D4]/10 rounded-md"
              >
                Check Verification Status
              </Button>

              <div className="text-center">
                <p className="text-[#AAAAAA] text-xs">
                  ⓘ After completing verification, click &quot;Check
                  Verification Status&quot; to continue
                </p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default KycVerificationPage;

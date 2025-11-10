"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { apiClient } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from "@/lib/toast";

const GoogleCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshSession } = useAuth();
  const isProcessingRef = useRef(false);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const error = searchParams.get("error");

  useEffect(() => {
    if (isProcessingRef.current) {
      return;
    }
    isProcessingRef.current = true;

    const handleCallback = async () => {
      if (error || !accessToken || !refreshToken) {
        showToast.error("Google authentication failed. Please try again.");
        router.replace("/login");
        return;
      }

      try {
        apiClient.setTokens(accessToken, refreshToken);
        const response = await refreshSession();

        if (!response) {
          router.replace("/login");
          return;
        }

        showToast.success("Signed in with Google!");
        router.replace("/congratulation");
      } catch (callbackError) {
        console.error("Google callback error:", callbackError);
        showToast.error("Unable to finalize Google sign-in.");
        router.replace("/login");
      }
    };

    void handleCallback();
  }, [accessToken, refreshSession, refreshToken, error, router]);

  return (
    <div className="min-h-screen bg-[#030714] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#0D111D] border border-[#212A38] rounded-xl p-10 text-center flex flex-col items-center gap-6"
      >
        <div className="h-16 w-16 rounded-full border-4 border-[#0FE2D4] border-t-transparent animate-spin"></div>
        <h1 className="text-white text-2xl font-semibold">
          Finalizing Google Sign-In
        </h1>
        <p className="text-[#AAAAAA]">
          Please wait while we secure your CivicForge account and redirect you
          to your dashboard.
        </p>
      </motion.div>
    </div>
  );
};

export default GoogleCallbackPage;

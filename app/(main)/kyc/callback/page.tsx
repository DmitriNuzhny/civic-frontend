"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from "@/lib/toast";
import { apiClient } from "@/lib/api";

interface KycStatusResponse {
  status: string;
  isKYCVerified: boolean;
  message: string;
}

const KycCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshSession, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsProcessing(true);

        // Get status from query parameters (Didit sends this in the callback URL)
        const status = searchParams.get("status");

        // If no status in URL, check backend for current status
        if (!status) {
          try {
            const response = await apiClient.get<KycStatusResponse>(
              "/kyc/status"
            );
            const kycStatus = response;

            if (kycStatus.status === "Approved" && kycStatus.isKYCVerified) {
              await refreshSession();
              showToast.success("KYC verification completed successfully!");
              router.push("/connect-wallet");
              return;
            } else if (kycStatus.status === "Declined") {
              showToast.error(
                "KYC verification was not successful. Please try again."
              );
              router.push("/kyc-verification");
              return;
            } else if (
              kycStatus.status === "Expired" ||
              kycStatus.status === "Abandoned"
            ) {
              showToast.error(
                `KYC verification ${kycStatus.status.toLowerCase()}. Please start a new verification.`
              );
              router.push("/kyc-verification");
              return;
            } else if (kycStatus.status === "In Review") {
              showToast.custom(
                "KYC verification is under manual review. We'll notify you once it's complete.",
                "info"
              );
              router.push("/kyc-verification");
              return;
            } else {
              // Still in progress
              showToast.custom(
                "KYC verification is still in progress. Please wait...",
                "info"
              );
              router.push("/kyc-verification");
              return;
            }
          } catch (error) {
            console.error("Failed to check KYC status:", error);
            showToast.error(
              "Failed to check verification status. Please try again."
            );
            router.push("/kyc-verification");
            return;
          }
        }

        // Handle status from callback URL
        const normalizedStatus = status.trim();

        if (normalizedStatus === "Approved") {
          // Refresh session to get updated KYC status
          await refreshSession();

          // Double-check with backend
          try {
            const response = await apiClient.get<KycStatusResponse>(
              "/kyc/status"
            );
            if (response.isKYCVerified) {
              showToast.success("KYC verification completed successfully!");
              router.push("/connect-wallet");
            } else {
              showToast.custom("KYC verification is being processed.", "info");
              router.push("/kyc-verification");
            }
          } catch {
            // If backend check fails, still redirect to connect-wallet if user is verified
            if (user?.isKYCVerified) {
              showToast.success("KYC verification completed successfully!");
              router.push("/connect-wallet");
            } else {
              showToast.custom("KYC verification is being processed.", "info");
              router.push("/kyc-verification");
            }
          }
        } else if (normalizedStatus === "Declined") {
          await refreshSession();
          showToast.error(
            "KYC verification was not successful. Please try again."
          );
          router.push("/kyc-verification");
        } else if (
          normalizedStatus === "Expired" ||
          normalizedStatus === "Abandoned"
        ) {
          await refreshSession();
          showToast.error(
            `KYC verification ${normalizedStatus.toLowerCase()}. Please start a new verification.`
          );
          router.push("/kyc-verification");
        } else if (normalizedStatus === "In Review") {
          await refreshSession();
          showToast.custom(
            "KYC verification is under manual review. We'll notify you once it's complete.",
            "info"
          );
          router.push("/kyc-verification");
        } else if (
          normalizedStatus === "In Progress" ||
          normalizedStatus === "Not Started"
        ) {
          await refreshSession();
          showToast.custom(
            "KYC verification is still in progress. Please complete the verification.",
            "info"
          );
          router.push("/kyc-verification");
        } else {
          // Unknown status, check backend
          await refreshSession();
          try {
            const response = await apiClient.get<KycStatusResponse>(
              "/kyc/status"
            );
            const kycStatus = response;
            showToast.custom(
              kycStatus.message || "Processing verification...",
              "info"
            );
            router.push("/kyc-verification");
          } catch {
            showToast.custom("Processing verification...", "info");
            router.push("/kyc-verification");
          }
        }
      } catch (error) {
        console.error("Error handling KYC callback:", error);
        showToast.error("An error occurred. Please try again.");
        router.push("/kyc-verification");
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-[#030714] flex items-center justify-center">
      <div className="text-white text-lg">
        {isProcessing ? "Processing KYC verification..." : "Redirecting..."}
      </div>
    </div>
  );
};

const KycCallbackFallback = () => {
  return (
    <div className="min-h-screen bg-[#030714] flex items-center justify-center">
      <div className="text-white text-lg">Loading...</div>
    </div>
  );
};

const KycCallbackPage = () => {
  return (
    <Suspense fallback={<KycCallbackFallback />}>
      <KycCallbackContent />
    </Suspense>
  );
};

export default KycCallbackPage;

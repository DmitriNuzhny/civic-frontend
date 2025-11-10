"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, XCircle, Loader2 } from "lucide-react";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from "@/lib/toast";

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

type VerificationStatus = "idle" | "verifying" | "success" | "error";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const { verifyEmail, resendVerificationEmail, isLoading } = useAuth();

  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  // Check if token is in URL
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      handleVerifyToken(token);
    }
  }, [searchParams]);

  const handleVerifyToken = async (token: string) => {
    setStatus("verifying");
    try {
      await verifyEmail(token);
      setStatus("success");
    } catch (error: any) {
      console.error("Error verifying email:", error.message);
      setStatus("error");
    }
  };

  const handleResendEmail = async () => {
    if (!email.trim()) {
      showToast.error("Please enter your email address");
      return;
    }

    setResendLoading(true);
    try {
      await resendVerificationEmail(email);
    } catch (error: any) {
      console.error("Error resending email:", error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4"
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
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src="/logo.svg"
                  alt="CivicForge"
                  width={192}
                  height={32}
                />
              </motion.div>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-10">
            {status === "idle" && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-6 items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Mail className="w-16 h-16 text-[#0FE2D4] mx-auto" />
                </motion.div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-white text-2xl font-semibold">
                    Verify Your Email
                  </h2>
                  <p className="text-[#AAAAAA] text-sm">
                    We&apos;ve sent a verification link to your email address.
                    Please check your inbox and click the link to verify your
                    account.
                  </p>
                </div>

                <div className="w-full flex flex-col gap-4 pt-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="resend-email"
                      className="text-white text-sm font-medium"
                    >
                      Didn&apos;t receive the email? Enter your email to resend
                    </Label>
                    <Input
                      id="resend-email"
                      type="email"
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12"
                    />
                  </div>
                  <Button
                    onClick={handleResendEmail}
                    disabled={resendLoading || isLoading}
                    className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {status === "verifying" && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-6 items-center text-center"
              >
                <Loader2 className="w-16 h-16 text-[#0FE2D4] animate-spin mx-auto" />
                <h2 className="text-white text-2xl font-semibold">
                  Verifying your email...
                </h2>
                <p className="text-[#AAAAAA] text-sm">
                  Please wait while we verify your email address.
                </p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-6 items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-[#0FE2D4] mx-auto" />
                </motion.div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-white text-2xl font-semibold">
                    Email Verified!
                  </h2>
                  <p className="text-[#AAAAAA] text-sm">
                    Your email has been successfully verified. Redirecting to
                    login...
                  </p>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-6 items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                </motion.div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-white text-2xl font-semibold">
                    Verification Failed
                  </h2>
                  <p className="text-[#AAAAAA] text-sm">
                    The verification link is invalid or has expired. Please
                    request a new verification email.
                  </p>
                </div>
                <div className="w-full flex flex-col gap-4 pt-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="resend-email-error"
                      className="text-white text-sm font-medium"
                    >
                      Enter your email to resend verification
                    </Label>
                    <Input
                      id="resend-email-error"
                      type="email"
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12"
                    />
                  </div>
                  <Button
                    onClick={handleResendEmail}
                    disabled={resendLoading || isLoading}
                    className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/auth/login"
                className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
              >
                Back to Login
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default VerifyEmailPage;

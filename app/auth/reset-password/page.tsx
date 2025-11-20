"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PasswordIcon } from "@/components/icons/loginIcons/passwordIcon";
import { apiClient } from "@/lib/api";
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

const ResetPasswordFallback = () => (
  <div className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[640px]"
    >
      <Card className="w-full bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
        <CardHeader className="text-center flex flex-col gap-6 items-center">
          <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
          <p className="text-white text-2xl font-semibold">
            Preparing reset form...
          </p>
        </CardHeader>
      </Card>
    </motion.div>
  </div>
);

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromQuery = searchParams.get("token");
    setToken(tokenFromQuery);
    if (!tokenFromQuery) {
      showToast.error("Invalid or missing password reset token.");
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      showToast.error("Reset token is missing or invalid.");
      return;
    }

    if (!password.trim()) {
      showToast.error("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      showToast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      showToast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/auth/reset-password", { token, password });
      showToast.success("Password reset successfully. You may now log in.");
      router.push("/auth/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to reset password. Please try again.";
      showToast.error(message);
    } finally {
      setIsSubmitting(false);
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
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-white text-2xl font-semibold">
                  Set a new password
                </p>
                <p className="text-[#AAAAAA] text-sm">
                  Enter and confirm your new password below to complete the
                  reset process.
                </p>
              </motion.div>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-10">
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
              variants={itemVariants}
            >
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="password"
                    className="text-white text-sm font-medium"
                  >
                    New password
                  </Label>
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 z-10" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter a new password"
                      className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                      required
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white text-sm font-medium"
                  >
                    Confirm new password
                  </Label>
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 z-10" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm your new password"
                      className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                      required
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || !token}
                  className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Resetting password..." : "Reset password"}
                </Button>
              </motion.div>
            </motion.form>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="text-[#AAAAAA] text-sm">
                Return to{" "}
                <Link
                  href="/auth/login"
                  className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
                >
                  Login
                </Link>
              </span>
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

const ResetPasswordPage = () => (
  <Suspense fallback={<ResetPasswordFallback />}>
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPasswordPage;

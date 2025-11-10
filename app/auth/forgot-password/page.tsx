"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailIcon } from "@/components/icons/loginIcons/mail";
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

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      showToast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response: { message: string } = await apiClient.post(
        "/auth/forgot-password",
        {
          email,
        }
      );
      setIsSubmitted(true);
      showToast.success(response.message);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to process your request. Please try again.";
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
                  Forgot your password?
                </p>
                <p className="text-[#AAAAAA] text-sm">
                  Enter the email associated with your account and we&apos;ll
                  send you a link to reset your password.
                </p>
              </motion.div>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-10">
            <motion.div className="flex flex-col gap-8" variants={itemVariants}>
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Label
                  htmlFor="email"
                  className="text-white text-sm font-medium"
                >
                  Email address
                </Label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 z-10" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  disabled={isSubmitting}
                  onClick={handleSendResetLink}
                  className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending reset link..." : "Send reset link"}
                </Button>
                {isSubmitted && (
                  <p className="text-[#0FE2D4] text-sm text-center">
                    Check your inbox for a password reset link.
                  </p>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="text-[#AAAAAA] text-sm">
                Remembered your password?{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
              >
                Back to login
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

export default ForgotPasswordPage;

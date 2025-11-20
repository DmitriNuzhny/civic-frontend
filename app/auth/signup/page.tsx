"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "@/lib/toast";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailIcon } from "@/components/icons/loginIcons/mail";
import { PasswordIcon } from "@/components/icons/loginIcons/passwordIcon";
import { GoogleIcon } from "@/components/icons/loginIcons/googlIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { API_BASE_URL } from "@/lib/api";

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

const SignupPage = () => {
  const router = useRouter();
  const { signup, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleGoogleAuth = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleSubmit = async (e: React.FormEvent | undefined) => {
    if (e) {
      e.preventDefault();
    }

    if (!firstName.trim()) {
      showToast.error("Please enter your first name");
      return;
    }

    if (!lastName.trim()) {
      showToast.error("Please enter your last name");
      return;
    }

    if (!email.trim()) {
      showToast.error("Please enter your email address");
      return;
    }

    if (!password.trim()) {
      showToast.error("Please enter your password");
      return;
    }

    if (password.length < 8) {
      showToast.error("Password must be at least 8 characters long");
      return;
    }

    if (!agreeToTerms) {
      showToast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      await signup(firstName.trim(), lastName.trim(), email, password);
      router.push("/auth/verify-email");
    } catch (error) {
      console.error("Signup failed:", error);
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
              <motion.p
                className="text-white text-2xl font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Welcome to CivicForge!
              </motion.p>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-10">
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10"
              variants={itemVariants}
            >
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <div className="flex-1 flex flex-col gap-2">
                    <Label
                      htmlFor="firstName"
                      className="text-white text-sm font-medium"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Your First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <Label
                      htmlFor="lastName"
                      className="text-white text-sm font-medium"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Your Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                      required
                    />
                  </div>
                </motion.div>

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
                    Email Address
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
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                      required
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label
                    htmlFor="password"
                    className="text-white text-sm font-medium"
                  >
                    Password
                  </Label>
                  <motion.div
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 z-10" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12 transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                      required
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={() => setAgreeToTerms(!agreeToTerms)}
                    />
                  </motion.div>
                  <label htmlFor="terms" className="text-[#AAAAAA] text-sm">
                    By signing up, I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating Account..." : "Create an Account"}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#384051]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0D111D] text-[#384051]">Or</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleGoogleAuth}
                type="button"
                variant="outline"
                className="w-full bg-[#212A38] border-[#384051] text-white hover:bg-[#212A38]/80 h-12 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <GoogleIcon className="w-5 h-5 text-[#0FE2D4]" />
                  </div>
                  <span className="text-[#0FE2D4] text-base font-semibold">
                    Sign Up by Google
                  </span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <span className="text-[#AAAAAA] text-sm">
                If you have already have an account,{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
              >
                Login
              </Link>
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

export default SignupPage;

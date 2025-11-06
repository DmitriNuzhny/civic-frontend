"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailIcon } from "@/components/icons/loginIcons/mail";
import { PasswordIcon } from "@/components/icons/loginIcons/passwordIcon";
import { GoogleIcon } from "@/components/icons/loginIcons/googlIcon";
import { Checkbox } from "@/components/ui/checkbox";

const SignupPage = () => {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  const handleSubmit = async (e: React.FormEvent | undefined) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await signup(email, password);
      console.log("Signup successful:", { email });
      router.push("/create-wallet");
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
      <Card className="w-full max-w-[640px] bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
        <CardHeader className="text-center flex flex-col gap-6 items-center">
          <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
          <p className="text-white text-2xl font-semibold">
            Welcome to CivicForge!
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-white text-sm font-medium"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="password"
                  className="text-white text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-[#0B1220] border-gray-600 text-white placeholder:text-[#AAAAAA] placeholder:text-base rounded-lg h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleSubmit}
                type="submit"
                disabled={isLoading}
                className="bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border-[1px] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create an Account"}
              </Button>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={() => setAgreeToTerms(!agreeToTerms)}
                />
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
              </div>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#384051]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0D111D] text-[#384051]">Or</span>
            </div>
          </div>

          <Button
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

          <div className="text-center">
            <span className="text-[#AAAAAA] text-sm">
              If you have already have an account,{" "}
            </span>
            <Link
              href="/login"
              className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="w-full pb-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default SignupPage;

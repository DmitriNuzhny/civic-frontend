"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/dashboardcomponents/header";
import Footer from "@/components/footer";
import Select from "@/components/ui/select";
import { BackIcon } from "@/components/icons/buytokenIcons/backIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast";

// Animation variants
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

const slideVariants = {
  hidden: { opacity: 0, x: -20, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Hook for animated number counter
const useAnimatedNumber = (value: number, duration: number = 1) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = animatedValue;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(startValue + (endValue - startValue) * easeOutCubic);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(endValue);
      }
    };

    if (startValue !== endValue) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return animatedValue;
};

const BuyTokenPage = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "ach">("card");
  const [tokenAmount, setTokenAmount] = useState("300,000");

  // Card payment form state
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  // ACH payment form state
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const tokenPrice = 3.3045;
  const priceChange = 1.02;
  const currentBalance = 3000000;
  const tokenAmountNum = parseFloat(tokenAmount.replace(/,/g, "")) || 0;
  const totalCost = tokenAmountNum * tokenPrice;
  const balanceAfterBuy = currentBalance + tokenAmountNum;

  const handleBuyTokens = () => {
    // Validate token amount
    const tokenAmountNum = parseFloat(tokenAmount.replace(/,/g, "")) || 0;

    if (tokenAmountNum <= 0) {
      showToast.error("Please enter a valid token amount");
      return;
    }

    // Validate payment method fields
    if (paymentMethod === "card") {
      if (!cardholderName.trim()) {
        showToast.error("Please enter the cardholder name");
        return;
      }
      if (!cardNumber.trim()) {
        showToast.error("Please enter the card number");
        return;
      }
      if (!expirationDate) {
        showToast.error("Please enter the expiration date");
        return;
      }
      if (!cvc.trim()) {
        showToast.error("Please enter the CVC security code");
        return;
      }
      if (!country) {
        showToast.error("Please select a country");
        return;
      }
      if (!state) {
        showToast.error("Please select a state");
        return;
      }
      if (!city) {
        showToast.error("Please select a city");
        return;
      }
      if (!zipCode.trim()) {
        showToast.error("Please enter the ZIP code");
        return;
      }
    } else {
      if (!accountHolderName.trim()) {
        showToast.error("Please enter the account holder name");
        return;
      }
      if (!bankAccountNumber.trim()) {
        showToast.error("Please enter the bank account number");
        return;
      }
      if (!bankRoutingNumber.trim()) {
        showToast.error("Please enter the bank routing number");
        return;
      }
      if (!bankName.trim()) {
        showToast.error("Please enter the bank name");
        return;
      }
      if (!accountType) {
        showToast.error("Please select an account type");
        return;
      }
      if (!billingAddress.trim()) {
        showToast.error("Please enter the billing address");
        return;
      }
    }

    // Show loading toast
    const loadingToast = showToast.loading("Processing your purchase...");

    // Simulate API call
    setTimeout(() => {
      showToast.success(`Successfully purchased ${tokenAmount} tokens!`);
      // Reset form if needed
    }, 2000);
  };

  // Animated values
  const animatedTotalCost = useAnimatedNumber(totalCost, 0.6);
  const animatedBalanceAfterBuy = useAnimatedNumber(balanceAfterBuy, 0.6);
  const animatedCurrentBalanceValue = useAnimatedNumber(
    currentBalance * tokenPrice,
    0.6
  );
  const animatedBalanceAfterBuyValue = useAnimatedNumber(
    balanceAfterBuy * tokenPrice,
    0.6
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div className="min-h-screen bg-[#030714] px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[60px]">
        <Header />
        <motion.div
          className="max-w-[960px] w-full mx-auto flex flex-col gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex flex-col gap-6 w-full items-center text-white"
            variants={itemVariants}
          >
            <div className="w-full flex items-center relative">
              <motion.div
                className="flex items-center gap-3 absolute left-0"
                onClick={() => router.push("/dashboard")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="bg-[#212A38] hover:bg-[#212A38]/80 border border-[#384051] text-[#0FE2D4] h-12 rounded-lg transition-colors justify-start cursor-pointer">
                  <BackIcon className="w-6! h-6! cursor-pointer" />
                </Button>
                <span className=" text-base font-medium cursor-pointer whitespace-nowrap">
                  Back to Token Page
                </span>
              </motion.div>
              <motion.p
                className="w-full  text-5xl font-bold text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Buy Tokens
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.p
                className=" text-5xl font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                ${tokenPrice}
              </motion.p>
              <motion.p
                className=" text-base text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CIVICFORGE{" "}
                <motion.span
                  className="text-[#0FE2D4]"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  +{priceChange}%
                </motion.span>
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="bg-[#0D111D] border-[#212A38] rounded-xl px-6 py-10">
              <CardContent className="flex flex-col gap-6 text-[#AAAAAA]">
                <div className="flex flex-col gap-6">
                  <motion.p
                    className="text-base font-semibold uppercase tracking-wider"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Payment Method
                  </motion.p>
                  <div className="flex flex-col gap-6">
                    <motion.label
                      className="flex items-center gap-3 cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <motion.input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="w-6 h-6 checked:w-4 checked:h-4 checked:ml-1.5 appearance-none border-2 border-[#384051] rounded-full checked:bg-[#0FE2D4] checked:border-[#0FE2D4] checked:ring-2 checked:ring-[#0FE2D4] checked:ring-offset-2 checked:ring-offset-[#0D111D] cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      />
                      <span className=" text-base font-medium">
                        Credit and Debit Card Payment
                      </span>
                    </motion.label>
                    <AnimatePresence mode="wait">
                      {paymentMethod === "card" && (
                        <motion.div
                          className="flex flex-col gap-4"
                          variants={slideVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <Input
                                type="text"
                                label="Cardholder Name"
                                value={cardholderName}
                                onChange={(e) =>
                                  setCardholderName(e.target.value)
                                }
                                placeholder="Name on card"
                                tooltip="Enter the name exactly as it appears on your credit or debit card"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <motion.div whileFocus={{ scale: 1.02 }}>
                                <Input
                                  type="text"
                                  label="Card Number"
                                  value={cardNumber}
                                  onChange={(e) =>
                                    setCardNumber(e.target.value)
                                  }
                                  placeholder="Card number"
                                  tooltip="Enter your 16-digit card number without spaces or dashes"
                                  className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                                />
                              </motion.div>
                            </motion.div>
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                          >
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Input
                                type="date"
                                label="Expiration Date"
                                value={expirationDate}
                                onChange={(e) =>
                                  setExpirationDate(e.target.value)
                                }
                                placeholder="MM/DD/YYYY"
                                tooltip="Enter the expiration date in MM/DD/YYYY format or click the calendar icon"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.35 }}
                            >
                              <Input
                                type="text"
                                label="CVC Security Code"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                placeholder="CVC Security Code"
                                tooltip="The 3-digit security code on the back of your card (4 digits for Amex on the front)"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.45 }}
                            >
                              <Select
                                label="Country"
                                value={country}
                                onChange={(value) => setCountry(value)}
                                tooltip="Select your country of residence"
                                className="bg-[#030714] border border-[#384051]  h-12 rounded-lg px-3 focus:outline-none focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4] transition-all"
                                options={[
                                  { value: "country1", label: "Country 1" },
                                  { value: "country2", label: "Country 2" },
                                  { value: "country3", label: "Country 3" },
                                ]}
                                placeholder="Select country"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Select
                                label="State"
                                value={state}
                                onChange={(value) => setState(value)}
                                tooltip="Select your state or province"
                                className="bg-[#030714] border border-[#384051]  h-12 rounded-lg px-3 focus:outline-none focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4] transition-all"
                                options={[
                                  { value: "state1", label: "State 1" },
                                  { value: "state2", label: "State 2" },
                                  { value: "state3", label: "State 3" },
                                ]}
                                placeholder="Select state"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.55 }}
                            >
                              <Select
                                label="City"
                                value={city}
                                onChange={(value) => setCity(value)}
                                tooltip="Select your city"
                                className="bg-[#030714] border border-[#384051]  h-12 rounded-lg px-3 focus:outline-none focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4] transition-all"
                                options={[
                                  { value: "city1", label: "City 1" },
                                  { value: "city2", label: "City 2" },
                                  { value: "city3", label: "City 3" },
                                ]}
                                placeholder="Select city"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              <Input
                                type="text"
                                label="ZIP Code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="ZIP code"
                                tooltip="Enter your postal or ZIP code"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.label
                      className="flex items-center gap-3 cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <motion.input
                        type="radio"
                        name="paymentMethod"
                        value="ach"
                        checked={paymentMethod === "ach"}
                        onChange={() => setPaymentMethod("ach")}
                        className="w-6 h-6 checked:w-4 checked:h-4 checked:ml-1.5 appearance-none border-2 border-[#384051] rounded-full checked:bg-[#0FE2D4] checked:border-[#0FE2D4] checked:ring-2 checked:ring-[#0FE2D4] checked:ring-offset-2 checked:ring-offset-[#0D111D] cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      />
                      <span className=" text-base font-medium">
                        ACH Payment
                      </span>
                    </motion.label>
                    <AnimatePresence mode="wait">
                      {paymentMethod === "ach" && (
                        <motion.div
                          className="flex flex-col gap-4"
                          variants={slideVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <Input
                                type="text"
                                label="Account Holder Name"
                                value={accountHolderName}
                                onChange={(e) =>
                                  setAccountHolderName(e.target.value)
                                }
                                placeholder="Account holder name"
                                tooltip="Enter the name as it appears on your bank account"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Input
                                type="text"
                                label="Bank Account Number"
                                value={bankAccountNumber}
                                onChange={(e) =>
                                  setBankAccountNumber(e.target.value)
                                }
                                placeholder="Bank account number"
                                tooltip="Enter your bank account number (usually 8-17 digits)"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                          >
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Input
                                type="text"
                                label="Bank Routing Number"
                                value={bankRoutingNumber}
                                onChange={(e) =>
                                  setBankRoutingNumber(e.target.value)
                                }
                                placeholder="Bank routing number"
                                tooltip="Enter your 9-digit routing number (found on checks or bank statement)"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.35 }}
                            >
                              <Input
                                type="text"
                                label="Bank Name"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                placeholder="Bank name"
                                tooltip="Enter the full name of your bank"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.45 }}
                            >
                              <Select
                                label="Account Type"
                                value={accountType}
                                onChange={(value) => setAccountType(value)}
                                tooltip="Select whether this is a checking or savings account"
                                className="bg-[#030714] border border-[#384051]  h-12 rounded-lg px-3 focus:outline-none focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4] transition-all"
                                options={[
                                  {
                                    value: "accountType1",
                                    label: "Account Type 1",
                                  },
                                  {
                                    value: "accountType2",
                                    label: "Account Type 2",
                                  },
                                  {
                                    value: "accountType3",
                                    label: "Account Type 3",
                                  },
                                ]}
                                placeholder="Select an account type"
                              />
                            </motion.div>
                            <motion.div
                              className="flex-1 flex flex-col gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Input
                                type="text"
                                label="Billing Address"
                                value={billingAddress}
                                onChange={(e) =>
                                  setBillingAddress(e.target.value)
                                }
                                placeholder="Billing address"
                                tooltip="Enter your billing address (street address, apartment, suite, etc.)"
                                className="bg-[#030714] border-[#384051] placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                              />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.hr
                  className="w-full border-[#212A38]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />

                <motion.div
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.p
                    className=" text-lg font-semibold uppercase tracking-wider"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Token Amount to Buy
                  </motion.p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 flex flex-col gap-2">
                        <Label className=" text-sm font-medium">
                          Token Amount
                        </Label>
                        <div className="flex flex-wrap items-center gap-4 mr-[14px]">
                          <motion.div
                            className="flex-1"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <Input
                              type="text"
                              value={tokenAmount}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9,]/g,
                                  ""
                                );
                                setTokenAmount(value);
                              }}
                              className="flex-1 bg-[#030714] border-[#384051] text-white placeholder:text-[#AAAAAA] placeholder:text-base h-12 rounded-lg transition-all focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                            />
                          </motion.div>
                          <div className="flex-1 flex items-center justify-end gap-3">
                            <span className=" text-xl">=</span>
                            <div className="flex gap-2 items-center">
                              <motion.span
                                className="text-[32px]"
                                key={totalCost}
                                initial={{ scale: 1.2, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {formatCurrency(animatedTotalCost)}
                              </motion.span>
                              <span className="text-[#0FE2D4] text-base">
                                +{priceChange}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02, x: 10 }}>
                      <Button
                        onClick={handleBuyTokens}
                        className="bg-[#0FE2D4] hover:bg-[#0FE2D4]/90 w-fit h-12 rounded-lg text-[#0D111D] text-base transition-all shadow-lg shadow-[#0FE2D4]/20 hover:shadow-[#0FE2D4]/40"
                      >
                        Buy {tokenAmount} Tokens
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-6 pt-6 border-t border-[#212A38]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.div
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <span className="text-base font-medium uppercase">
                      Current Token Balance:
                    </span>
                    <div className="flex flex-wrap items-center gap-4 mr-[14px]">
                      <motion.span
                        className="text-white text-[32px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formatNumber(currentBalance)}
                      </motion.span>
                      <div className="flex-1 flex items-center justify-end gap-3">
                        <span className=" text-xl">=</span>
                        <div className="flex gap-2 items-center">
                          <motion.span
                            className="text-[32px]"
                            key={currentBalance * tokenPrice}
                            initial={{ scale: 1.2, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {formatCurrency(animatedCurrentBalanceValue)}
                          </motion.span>
                          <span className="text-[#0FE2D4] text-base">
                            +{priceChange}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <span className="text-base font-medium uppercase">
                      Token Balance After Buy:
                    </span>
                    <div className="flex flex-wrap items-center gap-4 mr-[14px]">
                      <motion.span
                        className="text-white text-[32px]"
                        key={balanceAfterBuy}
                        initial={{ scale: 1.2, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formatNumber(Math.round(animatedBalanceAfterBuy))}
                      </motion.span>
                      <div className="flex-1 flex items-center justify-end gap-3">
                        <span className=" text-xl">=</span>
                        <div className="flex gap-2 items-center">
                          <motion.span
                            className="text-[32px]"
                            key={balanceAfterBuy * tokenPrice}
                            initial={{ scale: 1.2, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {formatCurrency(animatedBalanceAfterBuyValue)}
                          </motion.span>
                          <span className="text-[#0FE2D4] text-base">
                            +{priceChange}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default BuyTokenPage;

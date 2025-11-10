"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MetaIcon } from "@/components/icons/walletIcons/metaIcon";
import { PhantomIcon } from "@/components/icons/walletIcons/phantom";
import { CoinbaseIcon } from "@/components/icons/walletIcons/coinbase";
import { TrustIcon } from "@/components/icons/walletIcons/trustIcon";
import { useWallet } from "@/contexts/WalletContext";
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

const ConnectWalletPage = () => {
  const router = useRouter();
  const { setWalletAddress } = useWallet();
  const wallets = [
    {
      name: "Metamask",
      icon: <MetaIcon className="h-10! w-10!" />,
      onClick: () => {
        showToast.loading("Connecting to Metamask...");
        setTimeout(() => {
          setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
          showToast.success("Metamask wallet connected successfully!");
          router.push("/dashboard");
        }, 1500);
      },
    },
    {
      name: "Phantom",
      icon: <PhantomIcon className="h-10! w-10!" />,
      onClick: () => {
        showToast.loading("Connecting to Phantom...");
        setTimeout(() => {
          setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
          showToast.success("Phantom wallet connected successfully!");
          router.push("/dashboard");
        }, 1500);
      },
    },
    {
      name: "Trust",
      icon: <TrustIcon className="h-10! w-10!" />,
      onClick: () => {
        showToast.loading("Connecting to Trust Wallet...");
        setTimeout(() => {
          setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
          showToast.success("Trust Wallet connected successfully!");
          router.push("/dashboard");
        }, 1500);
      },
    },
    {
      name: "Coinbase",
      icon: <CoinbaseIcon className="h-10! w-10!" />,
      onClick: () => {
        showToast.loading("Connecting to Coinbase Wallet...");
        setTimeout(() => {
          setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
          showToast.success("Coinbase Wallet connected successfully!");
          router.push("/dashboard");
        }, 1500);
      },
    },
  ];

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
                transition={{ duration: 0.5, delay: 0.3 }}
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Connect Wallet
              </motion.h1>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-8">
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {wallets.map((wallet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={wallet.onClick}
                    className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-white h-16 rounded-lg transition-colors justify-start px-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <motion.div
                        className="flex items-center justify-center"
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {wallet.icon}
                      </motion.div>
                      <span className="text-white text-base font-medium">
                        {wallet.name}
                      </span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.p
                className="text-white text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                If you don&apos;t have a wallet
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => router.push("/create-wallet")}
                  className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors"
                >
                  Create a Wallet Here
                </Button>
              </motion.div>
              <motion.p
                className="text-[#AAAAAA] text-xs text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                ⓘ No app needed. Non-custodial. Seedless.
              </motion.p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <Link
                href="/dashboard"
                className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
              >
                Skip for now
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default ConnectWalletPage;

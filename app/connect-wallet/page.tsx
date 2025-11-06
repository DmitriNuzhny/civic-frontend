"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MetaIcon } from "@/components/icons/walletIcons/metaIcon";
import { PhantomIcon } from "@/components/icons/walletIcons/phantom";
import { CoinbaseIcon } from "@/components/icons/walletIcons/coinbase";
import { TrustIcon } from "@/components/icons/walletIcons/trustIcon";

const ConnectWalletPage = () => {
  const router = useRouter();
  const { setWalletAddress } = useWallet();
  const wallets = [
    {
      name: "Metamask",
      icon: <MetaIcon className="!h-10 !w-10" />,
      onClick: () => {
        console.log("Connect to Metamask");
        // Set wallet address when connected
        setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
      },
    },
    {
      name: "Phantom",
      icon: <PhantomIcon className="!h-10 !w-10" />,
      onClick: () => {
        console.log("Connect to Phantom");
        setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
      },
    },
    {
      name: "Trust",
      icon: <TrustIcon className="!h-10 !w-10" />,
      onClick: () => {
        console.log("Connect to Trust Wallet");
        setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
      },
    },
    {
      name: "Coinbase",
      icon: <CoinbaseIcon className="!h-10 !w-10" />,
      onClick: () => {
        console.log("Connect to Coinbase");
        setWalletAddress("0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b");
      },
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
      <Card className="w-full max-w-[640px] bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
        <CardHeader className="text-center flex flex-col gap-6 items-center">
          <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
          <h1 className="text-white text-3xl font-semibold">Connect Wallet</h1>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {wallets.map((wallet, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={wallet.onClick}
                className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-white h-16 rounded-lg transition-colors justify-start px-6"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center">
                    {wallet.icon}
                  </div>
                  <span className="text-white text-base font-medium">
                    {wallet.name}
                  </span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white text-sm text-center">
              If you don&apos;t have a wallet
            </p>
            <Button
              onClick={() => router.push("/create-wallet")}
              className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border-[1px] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors"
            >
              Create a Wallet Here
            </Button>
            <p className="text-[#AAAAAA] text-xs text-center">
              ⓘ No app needed. Non-custodial. Seedless.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/dashboard"
              className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
            >
              Skip for now
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

export default ConnectWalletPage;

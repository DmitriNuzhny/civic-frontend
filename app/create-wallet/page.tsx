"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";
import {
  Copy,
  QrCode,
  Shield,
  X,
  Pencil,
  Users,
  InfoIcon,
  CircleX,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { QRcodeImage } from "@/components/icons/createIcons/QRcodeImage";
import { DownloadIcon } from "@/components/icons/createIcons/downloadIcon";
import { PrintIcon } from "@/components/icons/createIcons/printIcon";
import { SaveIcon } from "@/components/icons/createIcons/saveIcon";
import { FaceIcon } from "@/components/icons/createIcons/faceIcon";
import { TouchIcon } from "@/components/icons/createIcons/touchIcon";
import { WindowsIcon } from "@/components/icons/createIcons/windowsIcon";
import { ShieldIcon } from "@/components/icons/createIcons/shieldIcon";
import { NoWriteIcon } from "@/components/icons/createIcons/noWriteIcon";
import { RecoveryIcon } from "@/components/icons/createIcons/recoveryIcon";
import { LockIcon } from "@/components/icons/createIcons/lockIcon";

const CreateWalletPage = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: initial, 1: recovery, 2: confirmation
  const [hasSavedCode, setHasSavedCode] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const { setWalletAddress } = useWallet();
  const walletAddress = "0xfe871316945fDF63bb6EDa2da6541A85A1ea7d3b";

  const handleCreateMethod = (method: string) => {
    // Simulate authentication attempt
    setTimeout(() => {
      if (Math.random() > 0.3) {
        // 70% success rate for demo
        setCurrentStep(1);
        setShowError(false);
        // Set wallet address in context when wallet is created
        setWalletAddress(walletAddress);
      } else {
        setShowError(true);
      }
    }, 1000);
  };

  const handleNext = () => {
    if (hasSavedCode) {
      setCurrentStep(2);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  // Initial step - Create wallet selection
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
        <Card className="w-full max-w-[640px] bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
          <CardHeader className="text-center flex flex-col gap-6 items-center">
            <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
            <h1 className="text-white text-3xl font-semibold">
              Create your wallet (non-custodial)
            </h1>
          </CardHeader>

          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <NoWriteIcon className="!w-6 !h-6 text-[#0FE2D4]" />
                <span className="text-white text-base">
                  No seed phrase to write down
                </span>
              </div>
              <div className="flex items-center gap-4">
                <RecoveryIcon className="w-6 h-6 text-[#0FE2D4]" />
                <span className="text-white text-base">
                  Add recovery so you&apos;re safe if you lose this device
                </span>
              </div>
              <div className="flex items-center gap-4">
                <LockIcon className="!w-6 !h-6 text-[#0FE2D4]" />
                <span className="text-white text-base">
                  5-year transfer lock is enforced by the token (not by us)
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#384051]"></div>
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-6 bg-[#0D111D] text-[#AAAAAA]">
                  Create with
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => handleCreateMethod("face")}
                className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-white h-16 rounded-lg transition-colors justify-start px-6"
              >
                <div className="flex items-center gap-4 w-full justify-center">
                  <FaceIcon className="!w-6 !h-6" />
                  <span className="text-white text-base font-medium">
                    Face ID
                  </span>
                </div>
              </Button>

              <Button
                onClick={() => handleCreateMethod("touch")}
                className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-white h-16 rounded-lg transition-colors justify-start px-6"
              >
                <div className="flex items-center gap-4 w-full justify-center">
                  <TouchIcon className="!w-6 !h-6" />
                  <span className="text-white text-base font-medium">
                    Touch ID
                  </span>
                </div>
              </Button>

              <Button
                onClick={() => handleCreateMethod("windows")}
                className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] text-white h-16 rounded-lg transition-colors justify-start px-6"
              >
                <div className="flex items-center gap-4 w-full justify-center">
                  <WindowsIcon className="!w-6 !h-6" />
                  <span className="text-white text-base font-medium">
                    Windows Hello
                  </span>
                </div>
              </Button>
              {showError && (
                <div className="flex justify-center items-center gap-2 text-[#EA0000] text-sm">
                  <CircleX className="w-5 h-5" />
                  <span>Action canceled. Please try again.</span>
                </div>
              )}
            </div>

            <div className="text-center">
              <span className="text-white text-sm">
                If you already have a wallet,{" "}
              </span>
              <Link
                href="/connect-wallet"
                className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
              >
                Connect a Wallet
              </Link>
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
  }

  // Confirmation step - Wallet created
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
        <Card className="w-full max-w-[640px] bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10 justify-between h-[760px]">
          <CardHeader className="text-center flex flex-col gap-6 items-center">
            <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
            <h1 className="text-white text-2xl font-semibold">
              Wallet created !
            </h1>
          </CardHeader>

          <CardContent className="flex flex-col gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="text-white text-base font-medium break-all">
                  {walletAddress}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="p-2 hover:bg-[#212A38] rounded transition-colors"
                  >
                    <Copy className="w-5 h-5 text-[#0FE2D4]" />
                  </button>
                  <button className="p-2 hover:bg-[#212A38] rounded transition-colors">
                    <QrCode className="w-5 h-5 text-[#0FE2D4]" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>

          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border-[1px] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors"
          >
            Continue to Token Page
          </Button>
        </Card>

        <div className="w-full pb-[60px]">
          <Footer />
        </div>
      </div>
    );
  }

  // Recovery code step
  return (
    <div className="relative min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
      <Card className="w-full max-w-[640px] bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
        <CardHeader className="text-center flex flex-col gap-6 items-center">
          <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
          <div className="flex flex-col gap-3">
            <h1 className="text-white text-3xl font-semibold">
              Save your Recovery Code
            </h1>
            <div className="text-center">
              <p className="text-white text-sm flex items-center justify-center gap-2">
                <InfoIcon className="w-5 h-5 text-white" />
                <span className="text-white">
                  Print or save this code in a safe place. Do not share it. We
                  will never ask for it.
                </span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 justify-center items-center">
            <QRcodeImage />
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="text-white text-base font-medium break-all">
                  {walletAddress}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="hover:bg-[#212A38] rounded transition-colors"
                >
                  <Copy className="w-6 h-6 text-[#0FE2D4]" />
                </button>
              </div>
            </div>
            <div className="flex items-start justify-center gap-2">
              <ShieldIcon />
              <p className="text-[#AAAAAA] text-center text-sm">
                This code alone cannot move funds. Recovery also requires
                identity checks and a 48-hour safety delay.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              className="flex-1 bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-12 px-6 rounded-lg transition-colors"
            >
              <DownloadIcon />
              <span className="ml-2">Download</span>
            </Button>

            <Button
              variant="outline"
              className="flex-1 bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-12 px-6 rounded-lg transition-colors"
            >
              <PrintIcon />
              <span className="ml-2">Print</span>
            </Button>

            <Button
              variant="outline"
              className="flex-1 bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-12 px-6 rounded-lg transition-colors"
            >
              <SaveIcon />
              <span className="ml-2">Save to File</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="saved"
              checked={hasSavedCode}
              onCheckedChange={(checked) => setHasSavedCode(checked === true)}
            />
            <label htmlFor="saved" className="text-white text-sm">
              I&apos;ve saved my Recovery Code safely.
            </label>
          </div>

          <Button
            onClick={handleNext}
            disabled={!hasSavedCode}
            className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border-[1px] text-[#0FE2D4] hover:text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </CardContent>
      </Card>
      <div className="w-full pb-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default CreateWalletPage;

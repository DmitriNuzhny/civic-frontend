"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Copy, InfoIcon, CheckIcon, RotateCcw } from "lucide-react";
import { Wallet } from "ethers";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { QRcodeImage } from "@/components/icons/createIcons/QRcodeImage";
import { DownloadIcon } from "@/components/icons/createIcons/downloadIcon";
import { PrintIcon } from "@/components/icons/createIcons/printIcon";
import { SaveIcon } from "@/components/icons/createIcons/saveIcon";
import { ShieldIcon } from "@/components/icons/createIcons/shieldIcon";
import { useWallet } from "@/contexts/WalletContext";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from "@/lib/toast";
import { apiClient } from "@/lib/api";

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
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const CreateWalletPage = () => {
  const router = useRouter();
  const { setWalletAddress } = useWallet();
  const { user, isInitializing, refreshSession } = useAuth();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInitializing) {
      return;
    }

    // Check if user has wallet already
    if (user?.walletAddress) {
      router.replace("/dashboard");
      return;
    }

    // Check if user is KYC verified
    if (user && !user.isKYCVerified) {
      showToast.error("KYC verification is required to create a wallet.");
      router.replace("/kyc-verification");
    }
  }, [user?.walletAddress, user?.isKYCVerified, isInitializing, router]);

  const createWalletData = () => {
    const wallet = Wallet.createRandom();
    const phrase = wallet.mnemonic?.phrase;
    if (!phrase) {
      throw new Error("Failed to generate mnemonic");
    }
    return {
      mnemonicWords: phrase.split(" "),
      walletAddress: wallet.address,
    };
  };

  const [walletData, setWalletData] = useState(() => {
    try {
      return createWalletData();
    } catch (error) {
      console.error("Wallet generation error:", error);
      return { mnemonicWords: [] as string[], walletAddress: "" };
    }
  });

  const mnemonicWords = walletData.mnemonicWords;
  const walletAddressState = walletData.walletAddress;
  const [isMnemonicCopied, setIsMnemonicCopied] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [hasSavedCode, setHasSavedCode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const mnemonicPhrase = useMemo(
    () => mnemonicWords.join(" "),
    [mnemonicWords]
  );

  const generateWallet = () => {
    try {
      const data = createWalletData();
      setWalletData(data);
      setWalletAddress(data.walletAddress);
      setHasSavedCode(false);
      showToast.success("Generated a new wallet phrase.");
    } catch (error) {
      console.error("Wallet generation error:", error);
      showToast.error("Unable to generate wallet. Please try again.");
    }
  };

  useEffect(() => {
    if (walletAddressState) {
      setWalletAddress(walletAddressState);
    }
  }, [walletAddressState, setWalletAddress]);

  const handleCopyMnemonic = async () => {
    if (!mnemonicWords.length) {
      showToast.error("Recovery phrase is not available.");
      return;
    }
    await navigator.clipboard.writeText(mnemonicPhrase);
    setIsMnemonicCopied(true);
    setIsAddressCopied(false);
    showToast.success("Recovery phrase copied to clipboard!");
    setTimeout(() => setIsMnemonicCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!mnemonicWords.length) {
      showToast.error("Recovery phrase is not available.");
      return;
    }
    try {
      showToast.loading("Preparing download...");

      // Find the QR code SVG element
      const qrCodeElement = qrCodeRef.current?.querySelector("svg");
      if (!qrCodeElement) {
        showToast.error("QR code not found");
        return;
      }

      // Convert SVG to blob
      const svgData = new XMLSerializer().serializeToString(qrCodeElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create a canvas to render the SVG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = document.createElement("img");

      img.onload = () => {
        // Set canvas size (QR code + padding + text)
        canvas.width = 360;
        canvas.height = 380;

        // Draw white background
        if (ctx) {
          ctx.fillStyle = "#0D111D";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw QR code centered
          const qrSize = 280;
          const qrX = (canvas.width - qrSize) / 2;
          const qrY = 40;
          ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

          // Draw text
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 16px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Wallet Address", canvas.width / 2, 30);

          ctx.fillStyle = "#0FE2D4";
          ctx.font = "12px monospace";
          ctx.fillText(walletAddressState, canvas.width / 2, qrY + qrSize + 30);

          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `recovery-code-${Date.now()}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              URL.revokeObjectURL(svgUrl);
              showToast.success("Recovery code downloaded successfully!");
            }
          }, "image/png");
        }
      };

      img.onerror = () => {
        showToast.error("Failed to download QR code");
        URL.revokeObjectURL(svgUrl);
      };

      img.src = svgUrl;
    } catch (error) {
      showToast.error("Failed to download recovery code");
      console.error("Download error:", error);
    }
  };

  const handlePrint = () => {
    if (!mnemonicWords.length) {
      showToast.error("Recovery phrase is not available.");
      return;
    }
    try {
      showToast.loading("Preparing print...");

      const formattedMnemonic = mnemonicWords
        .map((word, index) => `${index + 1}. ${word}`)
        .join("  ");

      // Create a print-friendly window
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        showToast.error("Please allow popups to print");
        return;
      }

      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Recovery Code - CivicForge</title>
            <style>
              @media print {
                @page {
                  margin: 20mm;
                  size: A4;
                }
              }
              body {
                font-family: Arial, sans-serif;
                background: white;
                color: black;
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .header h1 {
                font-size: 24px;
                margin-bottom: 10px;
              }
              .header p {
                font-size: 12px;
                color: #666;
              }
              .qr-container {
                margin: 30px 0;
                display: flex;
                justify-content: center;
              }
              .qr-container svg {
                border: 2px solid #000;
                padding: 10px;
                background: white;
              }
              .address {
                text-align: center;
                margin-top: 30px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background: #f9f9f9;
              }
              .address-label {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .address-value {
                font-family: monospace;
                font-size: 12px;
                word-break: break-all;
                color: #0FE2D4;
              }
              .warning {
                margin-top: 30px;
                padding: 15px;
                border: 1px solid #ff6b35;
                border-radius: 8px;
                background: #fff5f2;
                text-align: center;
                font-size: 12px;
                color: #333;
              }
              .warning strong {
                color: #ff6b35;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>CivicForge Recovery Code</h1>
              <p>Save this code in a safe place. Do not share it.</p>
            </div>
            <div class="qr-container">
              ${qrCodeRef.current?.querySelector("svg")?.outerHTML || ""}
            </div>
            <div class="address">
              <div class="address-label">Wallet Address:</div>
              <div class="address-value">${walletAddressState}</div>
              <div class="address-label">Recovery Phrase:</div>
              <div class="address-value">${formattedMnemonic}</div>
            </div>
            </div>
            <div class="warning">
              <strong>⚠️ IMPORTANT:</strong><br>
              This code alone cannot move funds. Recovery also requires identity checks and a 48-hour safety delay.
              Keep this code secure and never share it with anyone.
            </div>
          </body>
        </html>
      `;

      printWindow.document.write(printContent);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        showToast.success("Print dialog opened");
      }, 500);
    } catch (error) {
      showToast.error("Failed to open print dialog");
      console.error("Print error:", error);
    }
  };

  const handleSaveToFile = () => {
    if (!mnemonicWords.length) {
      showToast.error("Recovery phrase is not available.");
      return;
    }
    try {
      const formattedMnemonic = mnemonicWords
        .map((word, index) => `${index + 1}. ${word}`)
        .join("\n");

      const recoveryData = `CivicForge Recovery Code
==========================

Wallet Address: ${walletAddressState}

Mnemonic Phrase:
${formattedMnemonic}

IMPORTANT INFORMATION:
- Save this code in a safe place
- Do not share this code with anyone
- We will never ask for this code
- This code alone cannot move funds
- Recovery also requires identity checks and a 48-hour safety delay

Generated: ${new Date().toLocaleString()}`;

      const blob = new Blob([recoveryData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `recovery-code-${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast.success("Recovery code saved to file!");
    } catch (error) {
      showToast.error("Failed to save file");
      console.error("Save error:", error);
    }
  };

  const handleFinalize = async () => {
    if (!hasSavedCode) {
      showToast.error(
        "Please confirm that you have saved your recovery phrase."
      );
      return;
    }

    if (!walletAddressState) {
      showToast.error("Wallet address is not available.");
      return;
    }

    setIsSaving(true);
    try {
      await apiClient.patch("/user/wallet", {
        walletAddress: walletAddressState,
      });
      const session = await refreshSession();
      if (!session) {
        return;
      }
      showToast.success("Wallet ready!");
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to save wallet address.";
      showToast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

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
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h1 className="text-white text-3xl font-semibold">
                  Save your Recovery Code
                </h1>
                <div className="text-center">
                  <p className="text-white text-sm flex items-center justify-center gap-2">
                    <InfoIcon className="w-5 h-5 text-white" />
                    <span className="text-white">
                      Print or save this code in a safe place. Do not share it.
                      We will never ask for it.
                    </span>
                  </p>
                </div>
              </motion.div>
            </CardHeader>
          </motion.div>

          <CardContent className="flex flex-col gap-6">
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col gap-4 text-center items-center">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleCopyMnemonic}
                    variant="outline"
                    className="bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-11 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    {isMnemonicCopied ? (
                      <CheckIcon className="w-5 h-5 mr-2" />
                    ) : (
                      <Copy className="w-5 h-5 mr-2" />
                    )}
                    {isMnemonicCopied ? "Copied" : "Copy phrase"}
                  </Button>
                  <Button
                    onClick={generateWallet}
                    variant="outline"
                    className="bg-transparent border-[#384051] text-white hover:text-[#0FE2D4] h-11 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Generate new phrase
                  </Button>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
              >
                {mnemonicWords.map((word, index) => (
                  <div
                    key={word + index}
                    className="flex items-center gap-3 bg-[#101728] border border-[#1d2638] rounded-lg px-4 py-3"
                  >
                    <span className="text-[#0FE2D4] text-sm font-semibold w-6 text-right">
                      {index + 1}.
                    </span>
                    <span className="text-white text-base font-medium">
                      {word}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                ref={qrCodeRef}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <QRcodeImage value={mnemonicPhrase} size={240} />
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-white text-base font-medium break-all">
                    {walletAddressState}
                  </span>
                  <motion.button
                    onClick={async () => {
                      if (!walletAddressState) {
                        showToast.error("Wallet address is not available.");
                        return;
                      }
                      await navigator.clipboard.writeText(walletAddressState);
                      showToast.success("Wallet address copied to clipboard!");
                      setIsAddressCopied(true);
                      setIsMnemonicCopied(false);
                      setTimeout(() => setIsAddressCopied(false), 2000);
                    }}
                    className="rounded transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isAddressCopied ? (
                      <CheckIcon className="w-6 h-6 text-[#0FE2D4]" />
                    ) : (
                      <Copy className="w-6 h-6 text-[#0FE2D4]" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ShieldIcon />
                <p className="text-[#AAAAAA] text-center text-sm">
                  This code alone cannot move funds. Recovery also requires
                  identity checks and a 48-hour safety delay.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1 bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-12 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  <DownloadIcon />
                  <span className="ml-2">Download</span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="flex-1 bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-12 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  <PrintIcon />
                  <span className="ml-2">Print</span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSaveToFile}
                  variant="outline"
                  className="flex-1 bg-[#212A38] border-[#384051] text-[#0FE2D4] hover:text-[#0FE2D4]/80 hover:bg-[#212A38]/80 h-12 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  <SaveIcon />
                  <span className="ml-2">Save to File</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Checkbox
                  id="saved"
                  className="cursor-pointer"
                  checked={hasSavedCode}
                  onCheckedChange={(checked) =>
                    setHasSavedCode(checked === true)
                  }
                />
              </motion.div>
              <label
                htmlFor="saved"
                className="text-white text-sm cursor-pointer"
              >
                I&apos;ve saved my Recovery Code safely.
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleFinalize}
                disabled={!hasSavedCode || isSaving}
                className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border text-[#0FE2D4] hover:text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Go to dashboard"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default CreateWalletPage;

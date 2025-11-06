"use client";

import { LogoutIcon } from "../icons/dashboardIcons/logoutIcon";
import { Button } from "../ui/button";
import Image from "next/image";
import { useWallet } from "@/contexts/WalletContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { walletAddress } = useWallet();
  const { logout } = useAuth();
  return (
    <header className="flex justify-between items-center py-5">
      <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <Image src="/avatar.png" alt="Avatar" width={60} height={60} />
          <div className="flex flex-col gap-2">
            <div className="text-white text-base font-medium">Gregory M</div>
            <div className="text-[#AAAAAA] text-sm">
              {walletAddress
                ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}`
                : "Not connected"}
            </div>
          </div>
        </div>
        <Button
          className="bg-[#212A38] hover:bg-[#212A38]/80  border-[1px] border-[#384051] text-[#0FE2D4] h-12 rounded-lg transition-colors justify-start"
          onClick={() => {
            logout();
          }}
        >
          <div className="flex items-center gap-2">
            <LogoutIcon className="!w-6 !h-6" />
            <span className="text-[#0FE2D4] text-base font-medium">
              Log Out
            </span>
          </div>
        </Button>
      </div>
    </header>
  );
};
export default Header;

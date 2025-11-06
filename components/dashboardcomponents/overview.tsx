import { DashboardLogo } from "../icons/dashboardIcons/dashboardLogo";
import { LinkedInIcon } from "../icons/dashboardIcons/linkedInIcon";
import { XIcon } from "../icons/dashboardIcons/xIcon";
import { RedditIcon } from "../icons/dashboardIcons/redditIcon";
import { InstagramIcon } from "../icons/dashboardIcons/instagramIcon";
import Image from "next/image";

const Overview = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b-[1px] border-[#384051]">
        <p className="w-fit text-[#0FE2D4] text-lg border-b-[1px] border-[#0FE2D4] p-3">
          OVERVIEW
        </p>
      </div>

      <div className="flex flex-col gap-[60px]">
        <div className="flex gap-10">
          {/* Left Column - Company Info */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-1 text-white text-lg">
              <div className="flex gap-3">
                <DashboardLogo className="!w-full !h-full" />
                <div>
                  <p className="whitespace-nowrap">
                    leverages smart contracts,
                  </p>
                  <p className="whitespace-nowrap">
                    on a decentralized ledger,
                  </p>
                </div>
              </div>
              <p>
                to create more transparent, secure, and efficient crowdfunding
                for entrepreneurs. Our platform uses smart contracts for equity
                issuance, enhancing trust, accessibility, and reducing fees.
                Built on Avalanche blockchain technology for high-speed,
                low-cost transactions and proof-of-stake consensus.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <button className="flex justify-center items-center bg-[#212A38] hover:bg-[#212A38]/80 border-[1px] border-[#384051] p-2 rounded-lg transition-colors">
                <LinkedInIcon className="w-6 h-6 cursor-pointer" />
              </button>
              <button className="flex justify-center items-center bg-[#212A38] hover:bg-[#212A38]/80 border-[1px] border-[#384051] p-2 rounded-lg transition-colors">
                <XIcon className="w-6 h-6  cursor-pointer" />
              </button>
              <button className="flex justify-center items-center bg-[#212A38] hover:bg-[#212A38]/80 border-[1px] border-[#384051] p-2 rounded-lg transition-colors">
                <RedditIcon className="w-6 h-6  cursor-pointer" />
              </button>
              <button className="flex justify-center items-center bg-[#212A38] hover:bg-[#212A38]/80 border-[1px] border-[#384051] p-2 rounded-lg transition-colors">
                <InstagramIcon className="w-6 h-6  cursor-pointer" />
              </button>
            </div>
          </div>

          <Image
            src="/dashboard.png"
            alt="Dashboard Logo"
            width={800}
            height={400}
          />
        </div>
        <div className="flex gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[#AAAAAA] text-base">Incorporated</p>
                <p className="text-white text-lg">October 28, 2024</p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[#AAAAAA] text-base">Status</p>
                <p className="text-white text-lg">
                  Qualified Small Business (QSBS)
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[#AAAAAA] text-base">Headquarters</p>
                <p className="text-white text-lg">Centreville, Virginia</p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[#AAAAAA] text-base">Industry</p>
                <p className="text-white text-lg">
                  Fintech / Blockchain Infrastructure
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[#AAAAAA] text-base">Ticker</p>
                <p className="text-white text-lg">CF</p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[#AAAAAA] text-base">Valuation</p>
                <p className="text-white text-lg">$31.6 Million</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-[#AAAAAA] text-base">Platform includes</p>
            <div className="flex flex-col gap-3 text-white text-lg">
              <p>
                • Smart Contract Infrastructure: Enforces 5-year QSBS lock
                period
              </p>
              <p>
                • C-Corp Toolkits: Automated formation, compliance, and filings
              </p>
              <p>
                • Investor Wallet: QSBS countdowns, tax documents, liquidity
                alerts
              </p>
              <p>• Blockchain Ledger: Immutable record of share ownership</p>
              <p>• Integrated Payment Gateway: Fiat via Stripe or ACH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
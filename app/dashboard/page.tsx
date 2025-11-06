"use client";

import { Footer } from "@/components/footer";
import Header from "@/components/dashboardcomponents/header";
import Overview from "@/components/dashboardcomponents/overview";
import TabNavigation from "@/components/dashboardcomponents/tabNavigation";
import TokenInformation from "@/components/dashboardcomponents/tokenInformation";
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#030714]">
      <div className="text-white max-w-[1440px] mx-auto">
        <Header />
        <div className="flex flex-col gap-[60px]">
          <Overview />
          <TabNavigation />
          <TokenInformation />
        </div>
        <div className="pb-[60px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import { useState } from "react";

import BusinessModel from "./businssModel";
import GrowthForests from "./growthforests";
import UseOfFunds from "./usefund";
import InvestorDocuments from "./investorDocuments";
import Highlight from "./highlight";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("HIGHLIGHTS");
  const tabs = [
    "HIGHLIGHTS",
    "BUSINESS MODEL",
    "GROWTH FORECASTS",
    "USE OF FUNDS",
    "INVESTOR DOCUMENTS",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "HIGHLIGHTS":
        return <Highlight />;

      case "BUSINESS MODEL":
        return <BusinessModel />;

      case "GROWTH FORECASTS":
        return <GrowthForests />;

      case "USE OF FUNDS":
        return <UseOfFunds />;

      case "INVESTOR DOCUMENTS":
        return <InvestorDocuments />;

      default:
        return null;
    }
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-8 border-b-[1px] border-[#384051]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 text-lg font-medium transition-colors ${
              activeTab === tab
                ? "text-[#0FE2D4] border-b-2 border-[#0FE2D4]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};
export default TabNavigation;

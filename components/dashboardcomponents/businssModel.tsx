const BusinessModel = () => {
  const businessModelData = {
    issuerSide: [
      "$20/month SaaS subscriptions (compliance dashboard & governance alerts)",
      "$500 onboarding packages (C-Corp formation, tokenization setup)",
      "$300 annual listing upgrades (visibility boosts)",
    ],
    investorSide: [
      "$5-15/year for investor dashboards, tax PDFs, and alerts",
      "0.5% transaction fee on post-QSBS secondary trades",
      "$30/year premium analytics & syndicate dashboards",
    ],
  };
  return (
    <div className="flex flex-wrap gap-8 text-lg">
      <div className="flex-1 flex flex-col">
        <h3 className="bg-[#FFFFFF0A] text-white rounded-xl px-6 py-3">
          Issuer-Side Revenue
        </h3>
        <ul className="space-y-3">
          {businessModelData.issuerSide.map((item: string, index: number) => (
            <li
              key={index}
              className="text-white flex items-start border-[#212A3899] border-b-[1px] px-6 py-3"
            >
              <span className="mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="bg-[#FFFFFF0A] text-white rounded-xl px-6 py-3">
          Investor-Side Revenue
        </h3>
        <ul className="space-y-3">
          {businessModelData.investorSide.map((item: string, index: number) => (
            <li
              key={index}
              className="text-white flex items-start border-[#212A3899] border-b-[1px] px-6 py-3"
            >
              <span className="text-[#0FE2D4] mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default BusinessModel;

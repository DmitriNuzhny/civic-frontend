const UseOfFunds = () => {
  const useOfFundsData = [
    {
      percentage: 40,
      start:0,
      title: "Product Development:",
      description: "Platform, blockchain integration, testing",
    },
    {
      percentage: 25,
      start:40,
      title: "Compliance & Legal:",
      description: "Smart contract audits, securities counsel",
    },
    {
      percentage: 20,
      start:65,
      title: "Marketing & GTM:",
      description: "Founder/investor acquisition campaigns",
    },
    {
      percentage: 15,
      start:85,
      title: "Operations:",
      description: "KYC stack, hosting, platform support",
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-10">
      {useOfFundsData.map((item, index) => (
        <div key={index} className="relative flex items-center gap-10">
          <div className="flex-2 relative h-[60px]">
            <div className="absolute inset-0 pointer-events-none z-10">
              {[40, 65, 85, 100].map((percent) => (
                <div
                  key={percent}
                  className="absolute top-0 bottom-0 border-l border-[#0FE2D499]"
                  style={{ left: `${percent}%` }}
                />
              ))}
            </div>

            <div className="relative h-full bg-[#0FE2D440]">
              <div
                className="absolute top-0 left-0 h-full bg-[#0FE2D4] flex items-center justify-center"
                style={{ left: `${item.start}%`, width: `${item.percentage}%` }}
              >
                <span className="text-black font-bold text-base whitespace-nowrap">
                  {item.percentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-3">
            <h3 className="text-white font-bold text-base whitespace-nowrap">
              {item.title}
            </h3>
            <p className="text-white text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UseOfFunds;

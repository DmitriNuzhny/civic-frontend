import { PdfIcon } from "../icons/dashboardIcons/pdfIcon";

const InvestorDocuments = () => {
  const investorDocuments = [
    "2025 Valuation Report - Eqvista",
    "QSBS Qualification Letter - Eqvista",
    "Founders Narrative",
    "Business Presentation",
  ];
  return (
    <div className="flex flex-col gap-4 text-lg">
      {investorDocuments.map((doc, index) => (
        <div key={index} className="flex items-center gap-4">
          <PdfIcon className="!w-10 !h-10" />
          <a href="#" className="text-white underline transition-colors">
            {doc}
          </a>
        </div>
      ))}
    </div>
  );
};
export default InvestorDocuments;

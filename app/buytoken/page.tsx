import Header from "@/components/dashboardcomponents/header";
import { Footer } from "@/components/footer";

const BuyTokenPage = () => {
  return (
    <div className="min-h-screen bg-[#030714]">
      <div className="text-white max-w-[1440px] mx-auto">
        <Header />
        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col gap-6">
            <h1 className="text-white text-4xl font-bold">Buy Token</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyTokenPage;

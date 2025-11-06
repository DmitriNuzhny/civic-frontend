"use client";

import Link from "next/link";
import Image from "next/image";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CongratulationsPage = () => {
  return (
    <div className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4">
      <Card className="w-full max-w-[640px] bg-[#0D111D] border-[#212A38] lg:px-[60px] lg:py-10 px-4 py-6 flex flex-col gap-10">
        <CardHeader className="text-center flex flex-col gap-6 items-center">
          <Image src="/logo.svg" alt="CivicForge" width={192} height={32} />
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-3xl font-semibold">
              Congratulation!
            </h2>
            <h3 className="text-white text-3xl font-semibold">
              You have an account now.
            </h3>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-10">
          <div className="text-center">
            <p className="text-white text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="flex flex-col lg:gap-60 gap-10">
            <div className="flex flex-col gap-4">
              <Button className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border-[1px] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors">
                Connect a Wallet
              </Button>

              <Button className="w-full bg-[#212A38] hover:bg-[#212A38]/80 border-[#384051] border-[1px] text-[#0FE2D4] font-semibold text-base px-8 py-3 rounded-lg h-12 transition-colors">
                Create a Wallet
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/dashboard"
                className="text-[#0FE2D4] hover:text-[#0FE2D4]/80 text-sm font-medium transition-colors underline"
              >
                Skip for now
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full pb-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default CongratulationsPage;

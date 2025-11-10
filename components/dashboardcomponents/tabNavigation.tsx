"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BusinessModel from "./businssModel";
import GrowthForests from "./growthforests";
import UseOfFunds from "./usefund";
import InvestorDocuments from "./investorDocuments";
import Highlight from "./highlight";

const tabVariants = {
  inactive: {
    scale: 1,
    opacity: 0.7,
  },
  active: {
    scale: 1.05,
    opacity: 1,
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("HIGHLIGHTS");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tabs = [
    "HIGHLIGHTS",
    "BUSINESS MODEL",
    "GROWTH FORECASTS",
    "USE OF FUNDS",
    "INVESTOR DOCUMENTS",
  ];

  // Handle mouse down - start drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
    scrollContainerRef.current.style.userSelect = "none";
  };

  // Handle mouse leave - end drag
  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
      scrollContainerRef.current.style.userSelect = "auto";
    }
  };

  // Handle mouse up - end drag
  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
      scrollContainerRef.current.style.userSelect = "auto";
    }
  };

  // Handle mouse move - drag scroll
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

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
      <div className="relative flex items-center border-b border-[#384051] overflow-hidden">
        {/* Tabs Container */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-8 w-full scroll-smooth overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-3 text-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? "text-[#0FE2D4] border-b-2 border-[#0FE2D4]"
                  : "text-gray-400 hover:text-white"
              }`}
              variants={tabVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default TabNavigation;

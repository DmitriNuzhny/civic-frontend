"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <motion.div
      className="min-h-screen bg-[#030714] flex flex-col gap-10 items-center justify-center p-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      TermsPage
    </motion.div>
  );
}

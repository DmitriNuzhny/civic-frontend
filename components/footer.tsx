import Link from "next/link";

export default function Footer() {
  return (
    <div className="max-w-[640px] mx-auto flex justify-between items-center px-8 text-sm">
      <Link
        href="/"
        className="text-[#11BFA6] hover:text-[#69E6D3] transition-colors underline"
      >
        Home
      </Link>
      <Link
        href="/terms"
        className="text-[#11BFA6] hover:text-[#69E6D3] transition-colors underline"
      >
        Terms of Service
      </Link>
      <Link
        href="/privacy"
        className="text-[#11BFA6] hover:text-[#69E6D3] transition-colors underline"
      >
        Privacy Policy
      </Link>
    </div>
  );
}

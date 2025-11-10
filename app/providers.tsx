import { WalletProvider } from "@/contexts/WalletContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/lib/toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletProvider>
      <AuthProvider>
        {children}
        <ToastProvider />
      </AuthProvider>
    </WalletProvider>
  );
};

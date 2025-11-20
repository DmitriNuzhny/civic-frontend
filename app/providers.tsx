"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import {
  AppKitProvider,
  appKitConfig,
  queryClient,
  wagmiConfig,
} from "@/config/appkit";
import { WalletProvider } from "@/contexts/WalletContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/lib/toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider {...appKitConfig}>
          <WalletProvider>
            <AuthProvider>
              {children}
              <ToastProvider />
            </AuthProvider>
          </WalletProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

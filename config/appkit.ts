"use client";

import { AppKitProvider } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { avalanche } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";
import { cookieStorage, createStorage } from "wagmi";

const DEFAULT_PROJECT_ID = "c36e25dea69f83cd4153e5997681894a";

export const projectId =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? DEFAULT_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "Reown AppKit project id is not configured. Set NEXT_PUBLIC_REOWN_PROJECT_ID."
  );
}

const avalancheNetwork: AppKitNetwork = {
  ...avalanche,
  chainNamespace: "eip155",
  caipNetworkId: `eip155:${avalanche.id}`,
};

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [avalancheNetwork];

const metadata = {
  name: "CivicForge",
  description: "CivicForge wallet connection",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://107.21.162.2.sslip.io",
  icons: [
    process.env.NEXT_PUBLIC_APP_ICON_URL ??
      "https://107.21.162.2.sslip.io/logo.svg",
  ],
};

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

export const queryClient = new QueryClient();

export const appKitConfig = {
  projectId,
  metadata,
  networks,
  adapters: [wagmiAdapter],
  themeMode: "dark" as const,
};

export { AppKitProvider };

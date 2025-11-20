/**
 * Determines the redirect path after login based on user's wallet and KYC status
 * @param user - User object with walletAddress and isKYCVerified
 * @returns The path to redirect to
 */
export function getPostLoginRedirectPath(user: {
  walletAddress?: string | null;
  isKYCVerified: boolean;
}): string {
  // If user doesn't have a wallet, redirect to connect wallet page
  if (!user.walletAddress) {
    return "/connect-wallet";
  }

  // If user has wallet but not KYC verified, redirect to KYC verification page
  if (!user.isKYCVerified) {
    return "/kyc-verification";
  }

  // If both wallet and KYC are done, redirect to dashboard
  return "/dashboard";
}

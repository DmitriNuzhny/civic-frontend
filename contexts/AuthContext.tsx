"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useDisconnect } from "wagmi";

import { useWallet } from "@/contexts/WalletContext";
import { showToast } from "@/lib/toast";
import { apiClient } from "@/lib/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  isKYCVerified: boolean;
  walletAddress?: string;
  avatarUrl?: string | null;
  createdAt: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  refreshSession: () => Promise<AuthResponse | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { setWalletAddress } = useWallet();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    apiClient.setUnauthorizedHandler(() => {
      setUser(null);
      setWalletAddress(null);
    });

    return () => {
      apiClient.setUnauthorizedHandler(null);
    };
  }, [setWalletAddress]);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const accessToken = apiClient.getAccessToken();
      const refreshToken = apiClient.getRefreshToken();

      if (!accessToken && refreshToken) {
        const response = await apiClient.refreshSession();
        if (response) {
          setUser(response.user);
          setWalletAddress(response.user.walletAddress ?? null);
          setIsInitializing(false);
          return;
        }
      }

      if (accessToken) {
        try {
          const response = await apiClient.get<{ user: User }>("/auth/me");
          setUser(response.user as User);
          setWalletAddress(response.user.walletAddress ?? null);
        } catch (error) {
          // Token is invalid or expired, clear it
          apiClient.clearTokens();
          setUser(null);
          setWalletAddress(null);
          console.log(error);
        }
      }
      setIsInitializing(false);
    };

    loadUser();
  }, [setWalletAddress]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      // Store token
      apiClient.setTokens(response.accessToken, response.refreshToken);

      // Set user
      setUser(response.user);
      setWalletAddress(response.user.walletAddress ?? null);

      showToast.success("Login successful!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials.";
      showToast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      // Store token
      apiClient.setTokens(response.accessToken, response.refreshToken);

      // Set user
      setUser(response.user);
      setWalletAddress(response.user.walletAddress ?? null);

      showToast.success(
        "Account created successfully! Please check your email to verify your account."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again.";
      showToast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/verify-email", { token });

      // Update user email verification status
      if (user) {
        setUser({ ...user, isEmailVerified: true });
      }

      showToast.success("Email verified successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Email verification failed. Please try again.";
      showToast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/resend-verification", { email });
      showToast.success(
        "If an account with this email exists, a verification email has been sent."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend verification email.";
      showToast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      disconnect();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to disconnect wallet";
      console.error("Wallet disconnect error:", message);
    }

    apiClient.clearTokens();
    setUser(null);
    setWalletAddress(null);
    showToast.success("Logged out successfully");
  };

  const refreshSession = async (): Promise<AuthResponse | null> => {
    try {
      const response = await apiClient.refreshSession();
      if (response) {
        setUser(response.user);
        setWalletAddress(response.user.walletAddress ?? null);
        return response;
      }
      apiClient.clearTokens();
      setUser(null);
      setWalletAddress(null);
      showToast.error("Session expired. Please log in again.");
      return null;
    } catch {
      apiClient.clearTokens();
      setUser(null);
      setWalletAddress(null);
      showToast.error("Session expired. Please log in again.");
      return null;
    }
  };

  const isAuthenticated =
    user !== null &&
    (apiClient.getAccessToken() !== null ||
      apiClient.getRefreshToken() !== null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isInitializing,
        login,
        signup,
        logout,
        verifyEmail,
        resendVerificationEmail,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

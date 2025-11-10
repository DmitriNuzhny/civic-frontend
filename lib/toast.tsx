"use client";

import toast, { Toaster } from "react-hot-toast";

// Custom toast styles that match your dark theme
const toastStyles = {
  style: {
    background: "#212A38",
    color: "#FFFFFF",
    border: "1px solid #384051",
    borderRadius: "0.5rem",
    padding: "12px 16px",
  },
  success: {
    iconTheme: {
      primary: "#0FE2D4",
      secondary: "#212A38",
    },
  },
  error: {
    iconTheme: {
      primary: "#EF4444",
      secondary: "#212A38",
    },
  },
  loading: {
    iconTheme: {
      primary: "#0FE2D4",
      secondary: "#212A38",
    },
  },
};

// Toast utility functions
export const showToast = {
  success: (message: string) => {
    toast.success(message, toastStyles);
  },
  error: (message: string) => {
    toast.error(message, toastStyles);
  },
  loading: (message: string) => {
    return toast.loading(message, toastStyles);
  },
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages, toastStyles);
  },
  custom: (message: string, type: "success" | "error" | "info" = "info") => {
    const config = {
      ...toastStyles,
      duration: 4000,
    };
    
    if (type === "success") {
      toast.success(message, config);
    } else if (type === "error") {
      toast.error(message, config);
    } else {
      toast(message, config);
    }
  },
};

// Toaster component with custom styling
export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#212A38",
          color: "#FFFFFF",
          border: "1px solid #384051",
          borderRadius: "0.5rem",
          padding: "12px 16px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#0FE2D4",
            secondary: "#212A38",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#212A38",
          },
        },
        loading: {
          iconTheme: {
            primary: "#0FE2D4",
            secondary: "#212A38",
          },
        },
      }}
    />
  );
};

export default toast;


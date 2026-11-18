"use client";
import { LayoutProvider } from "@/context/useLayoutContext";
import { NotificationProvider } from "@/context/useNotificationContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isAuthenticated, isInitialized } = useAuth();
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/auth/sign-in");
    }
  }, [isAuthenticated, isInitialized, router]);
  return (
    <LayoutProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </LayoutProvider>
  );
};

export default AppProvidersWrapper;

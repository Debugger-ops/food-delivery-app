'use client';

import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/components/AppContext";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Don’t wrap 404 page
  if (pathname === "/_not-found") {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <AppProvider>
        <Toaster />
        <Header />
        {children}
      </AppProvider>
    </SessionProvider>
  );
}

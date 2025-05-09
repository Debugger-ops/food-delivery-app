'use client';

import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/components/AppContext"; // Import the AppProvider

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <AppProvider> {/* Wrap with AppProvider to make CartContext available */}
        <Toaster />
        <Header />
        {children}
      </AppProvider>
    </SessionProvider>
  );
}

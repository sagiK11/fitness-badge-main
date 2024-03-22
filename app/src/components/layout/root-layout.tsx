import React from "react";
import { MainFooter } from "./main-footer";
import { MainHeader } from "./main-header";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <MainHeader />
      <main className="h-full mt-4 mb-8 lg:mb-16 flex-1">{children}</main>
    </div>
  );
}

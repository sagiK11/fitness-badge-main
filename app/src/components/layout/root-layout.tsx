import React from "react";
import { MainFooter } from "./main-footer";
import { MainHeader } from "./main-header";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-between">
      <MainHeader />
      <main className="h-full mt-[92px] mb-8">{children}</main>
    </div>
  );
}

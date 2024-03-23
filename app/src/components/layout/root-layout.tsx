import React from "react";
import { MainHeader } from "./main-header";

interface RootLayoutProps {
  children: React.ReactNode;
  hideYearOfStudy?: boolean;
}

export function RootLayout({ children, hideYearOfStudy }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <MainHeader hideYearOfStudy={hideYearOfStudy} />
      <main className="h-full mt-4 mb-8 lg:mb-16 flex-1">{children}</main>
    </div>
  );
}

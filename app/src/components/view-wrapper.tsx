import React from "react";
import { SeoMetadata } from "./seo-metadata";

interface ViewWrapper {
  children: React.ReactNode;
}
export function ViewWrapper({ children }: ViewWrapper) {
  return (
    <>
      <SeoMetadata />
      {children}
    </>
  );
}

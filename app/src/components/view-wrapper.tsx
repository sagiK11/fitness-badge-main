import React from "react";
import { SeoMetadata, SeoMetadataProps } from "./seo-metadata";

interface ViewWrapper extends SeoMetadataProps {
  children: React.ReactNode;
}
export function ViewWrapper({ children, ...seo }: ViewWrapper) {
  return (
    <>
      <SeoMetadata {...seo} />
      {children}
    </>
  );
}

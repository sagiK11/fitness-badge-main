import React from "react";
import { SeoMetadata, SeoMetadataProps } from "./seo-metadata";

interface ViewWrapperProps extends SeoMetadataProps {
  children: React.ReactNode;
}

export function ViewWrapper({ children, ...seo }: ViewWrapperProps) {
  return (
    <>
      <SeoMetadata {...seo} />
      {children}
    </>
  );
}

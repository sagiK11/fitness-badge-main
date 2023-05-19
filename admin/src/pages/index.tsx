import {
  Container,
  SchoolsCard,
  UploadCsvCard,
  ViewWrapper,
} from "@/components";
import { RootLayout } from "@/components/layout";
import React from "react";

export default function Home() {
  return (
    <ViewWrapper>
      <RootLayout>
        <Container className="gap-4">
          <UploadCsvCard />
          <SchoolsCard />
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

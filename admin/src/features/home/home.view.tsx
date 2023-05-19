import {
  Container,
  SchoolsCard,
  UploadCsvCard,
  ViewWrapper,
  RootLayout,
} from "@/components";
import React from "react";

export function HomeView() {
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

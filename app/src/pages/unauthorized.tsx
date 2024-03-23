import {
  Alert,
  Container,
  FlexBox,
  RootLayout,
  ViewWrapper,
} from "@/components";

import React from "react";

export default function UnAuthorizedTeacher() {
  return (
    <ViewWrapper>
      <RootLayout hideYearOfStudy>
        <Container className="gap-4 lg:gap-6">
          <FlexBox className="w-full justify-center">
            <Alert> אינך מורשה להשתמש באפליקציה זו</Alert>
          </FlexBox>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

import {
  Container,
  FlexBox,
  TeachersCard,
  Typography,
  ViewWrapper,
} from "@/components";
import { RootLayout } from "@/components/layout";
import { useSchool } from "@/hooks";
import { useRouter } from "next/router";
import React from "react";

export default function SchoolDetailsView() {
  const router = useRouter();
  const { school } = useSchool(router.query.schoolId as string);

  return (
    <ViewWrapper title="School Details">
      <RootLayout>
        <Container className="gap-4">
          <FlexBox className="flex-col gap-1">
            <Typography className="text-2xl font-bold ">School name</Typography>
            <Typography className="text-secondary font-bold">
              {school?.name}
            </Typography>
          </FlexBox>
          <TeachersCard schoolId={school?.id as string} />
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

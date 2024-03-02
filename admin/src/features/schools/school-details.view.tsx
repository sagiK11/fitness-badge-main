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

export function SchoolDetailsView() {
  const router = useRouter();
  const { school } = useSchool(router.query.schoolId as string);

  return (
    <ViewWrapper title="School Details">
      <RootLayout>
        <Container className="gap-4">
          <FlexBox className="flex-col gap-1">
            <Typography className="text-primary font-bold text-2xl">
              {school?.name}
            </Typography>
          </FlexBox>

          {school?.id && <TeachersCard schoolId={school.id} />}
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

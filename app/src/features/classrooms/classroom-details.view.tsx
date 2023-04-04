import {
  Button,
  CardBody,
  CardTitle,
  Container,
  FlexBox,
  Grid,
  RootLayout,
  Typography,
  ViewWrapper,
  Card,
} from "@/components";
import { useStudents } from "@/hooks";
import { routesTree } from "@/routesTree";
import { formatName, formatDate } from "@/utils";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export function ClassroomDetailsView() {
  const router = useRouter();
  const { classroomId, yearOfStudyId } = router.query;
  const { students } = useStudents();

  return (
    <ViewWrapper>
      <RootLayout>
        <Container className="gap-4 lg:gap-6">
          <Card className="bg-white" section>
            <CardTitle>תלמידים</CardTitle>

            {students?.map((student) => (
              <CardBody key={student.id} hover>
                <Grid className="grid-cols-1 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">שם</Typography>
                    <Typography bold>{formatName(student)}</Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">טלפון</Typography>
                    <Typography bold>{student.phone ?? "-"}</Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">
                      תאריך עדכון אחרון
                    </Typography>
                    <Typography bold>
                      {formatDate(student.updatedAt)}
                    </Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Button
                      className="btn-secondary btn-sm self-start"
                      iconEnd={<AiOutlineArrowLeft />}
                      href={
                        routesTree({
                          yearOfStudyId: yearOfStudyId as string,
                          classroomId: classroomId as string,
                          studentId: student.id,
                        }).studentDetails
                      }
                    >
                      ערוך
                    </Button>
                  </FlexBox>
                </Grid>
              </CardBody>
            ))}
          </Card>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

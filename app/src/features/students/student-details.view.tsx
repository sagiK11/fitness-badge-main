import {
  CardBody,
  CardTitle,
  Container,
  FlexBox,
  Grid,
  RootLayout,
  Typography,
  ViewWrapper,
  Card,
  Button,
} from "@/components";
import { useStudent, useYearOfStudy } from "@/hooks";
import { routesTree } from "@/routesTree";
import { formatName, formatDate } from "@/utils";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export function StudentDetailsViewView() {
  const { student, isLoading } = useStudent();
  const { currentYearOfStudy } = useYearOfStudy();
  const router = useRouter();

  if (!student) return null;

  return (
    <ViewWrapper>
      <RootLayout>
        <Container className="gap-4 lg:gap-6">
          <Card section>
            <CardTitle>פרטי התלמיד</CardTitle>
            <CardBody>
              <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
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
                    תאריך יצירה
                  </Typography>
                  <Typography bold>{formatDate(student.createdAt)}</Typography>
                </FlexBox>
                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">
                    תאריך עדכון אחרון
                  </Typography>
                  <Typography bold>{formatDate(student.updatedAt)}</Typography>
                </FlexBox>
              </Grid>
            </CardBody>
          </Card>
          <Card section>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>קטגוריה</th>
                      <th>ציון</th>
                      <th>תוצאה</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.tests.map((test) => {
                      return (
                        <tr className="hover" key={test.id}>
                          <th>{test.category.name}</th>
                          <td>{test.grade}</td>
                          <td>{test.score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <FlexBox className="px-3 lg:px-0">
            <Button
              className="btn-outline btn-primary btn-sm lg:btn-md"
              iconStart={<AiOutlineArrowRight />}
              href={
                routesTree({
                  yearOfStudyId: currentYearOfStudy.id,
                  classroomId: router.query.classroomId as string,
                }).yearOfStudy
              }
            >
              חזרה
            </Button>
          </FlexBox>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

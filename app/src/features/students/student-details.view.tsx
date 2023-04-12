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
  Form,
  FormNumberFormatInput,
} from "@/components";
import { useStudent, useTests, useYearOfStudy } from "@/hooks";
import { routesTree } from "@/routesTree";
import { formatName, formatDate } from "@/utils";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight } from "react-icons/ai";

export function StudentDetailsViewView() {
  const { student } = useStudent();
  const { updateTests } = useTests();
  const { currentYearOfStudy } = useYearOfStudy();
  const router = useRouter();

  const defaultValues = student?.tests.reduce(
    (prev, test) => ({ ...prev, [test.id]: test.score }),
    {}
  );
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const submit = React.useCallback(
    (data: { [id: string]: number }) => {
      const tests = Object.entries(data).map(([id, score]) => ({
        id,
        score: Number(score),
      }));
      updateTests(tests);
    },
    [updateTests]
  );

  if (!student) return null;

  return (
    <ViewWrapper title="Student Details">
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

          <Card
            section
            as={Form}
            methods={methods}
            onSubmit={methods.handleSubmit(submit)}
          >
            <CardTitle>ציונים</CardTitle>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>קטגוריה</th>
                      <th>תוצאה</th>
                      <th>ציון</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.tests.map((test) => {
                      return (
                        <tr className="hover" key={test.categoryId}>
                          <th>{test.category.name}</th>
                          <td>
                            <FormNumberFormatInput
                              name={test.id}
                              className="input-sm lg:input-lg input-bordered  "
                            />
                          </td>
                          <td>{test.grade}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <FlexBox className="justify-between lg:justify-center gap-2 ">
                <Button
                  className="btn-outline btn-accent min-w-[150px]"
                  type="reset"
                >
                  אפס
                </Button>
                <Button className="btn-accent min-w-[150px]" type="submit">
                  שמור
                </Button>
              </FlexBox>
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
                }).classroomDetails
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

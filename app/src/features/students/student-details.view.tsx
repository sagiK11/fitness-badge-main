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
  NumberFormatInput,
  Select,
  Breadcrumbs,
  NameValueGroup,
} from "@/components";
import { useClassroom, useStudent, useTests, useYearOfStudy } from "@/hooks";
import { GenderEnum } from "@/models";
import { routesTree } from "@/routesTree";
import { formatName, formatDate } from "@/utils";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export function StudentDetailsViewView() {
  const { student, availableTestsOptions, addStudentTest } = useStudent();
  const { updateTest, updateTestResult } = useTests();
  const { currentYearOfStudy } = useYearOfStudy();
  const { classroom } = useClassroom();
  const router = useRouter();

  const [testCategoryId, setTestCategoryId] = React.useState<string>();

  const backUrl = routesTree({
    yearOfStudyId: currentYearOfStudy.id,
    classroomId: router.query.classroomId as string,
  }).classroomDetails;

  if (!student) return null;

  return (
    <ViewWrapper title="Student Details">
      <RootLayout>
        <Container className="gap-4 lg:gap-6">
          <Breadcrumbs
            items={[
              { label: "בית", href: routesTree().home },
              { label: classroom?.name as string, href: backUrl },
              { label: formatName(student) },
            ]}
          />
          <FlexBox className="flex-col md:gap-1">
            <Typography className="text-primary font-semibold">כיתה</Typography>
            <Typography bold>{classroom?.name}</Typography>
          </FlexBox>

          <Card section>
            <CardTitle>פרטי התלמיד</CardTitle>
            <CardBody>
              <Grid className="grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-3 md:items-center">
                <NameValueGroup name="ת.ז." value={student.israelId} />

                <NameValueGroup name="שם" value={formatName(student)} />

                <NameValueGroup
                  name="מגדר"
                  value={student.gender === GenderEnum.female ? "נקבה" : "זכר"}
                />

                <NameValueGroup name="טלפון" value={student.phone ?? "-"} />

                <NameValueGroup name="אימייל" value={student.email ?? "-"} />

                <NameValueGroup
                  name="תאריך יצירה"
                  value={formatDate(student.createdAt)}
                />

                <NameValueGroup
                  name="תאריך עדכון אחרון"
                  value={formatDate(student.updatedAt)}
                />
              </Grid>
            </CardBody>
          </Card>

          <Card section>
            <CardTitle>מבחנים וציונים</CardTitle>
            <CardBody size="none">
              <Grid className="grid-cols-3 md:grid-cols-5  gap-2 lg:gap-3 md:items-center bg-gray-200 p-4">
                <FlexBox className="flex-col md:gap-1">
                  <Typography bold className="text-base-content">
                    קטגוריה
                  </Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1">
                  <Typography bold className="text-base-content">
                    תוצאה
                  </Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1">
                  <Typography bold className="text-base-content">
                    ציון
                  </Typography>
                </FlexBox>
              </Grid>

              <FlexBox className="overflow-x-auto flex-col divide-y">
                {student.tests.map((test) => {
                  const { originalArgs, isLoading } = updateTestResult;
                  const isUpdating = originalArgs?.id === test.id && isLoading;
                  return (
                    <CardBody
                      key={test.id}
                      className="hover:bg-gray-100 transition-all duration-200"
                    >
                      <Grid className="grid-cols-3 md:grid-cols-5  gap-4 lg:gap-8 md:items-center ">
                        <FlexBox className="flex-col md:gap-1">
                          <Typography className="text-secondary">
                            {test.category.name}
                          </Typography>
                        </FlexBox>

                        <FlexBox className="flex-col md:gap-1">
                          <NumberFormatInput
                            debounceTime={1000}
                            defaultValue={test.score}
                            className="input-bordered input-sm md:input-md"
                            onChange={(e) =>
                              updateTest({
                                id: test.id,
                                score: parseFloat(e.target.value),
                                gender: student.gender,
                                categoryId: test.categoryId,
                              })
                            }
                            disabled={isUpdating}
                          />
                        </FlexBox>

                        <FlexBox className="flex-col md:gap-1">
                          <Typography
                            className={classNames("text-info-content", {
                              "opacity-60": isUpdating,
                            })}
                          >
                            {test.grade}
                          </Typography>
                        </FlexBox>
                      </Grid>
                    </CardBody>
                  );
                })}
              </FlexBox>
            </CardBody>
          </Card>

          {availableTestsOptions.length > 0 && (
            <Card section>
              <CardTitle>הוסף מבחן</CardTitle>
              <CardBody>
                <Grid className="grid-cols-2 md:grid-cols-5 gap-1 md:gap-3 items-center">
                  <Select
                    onChange={(e) => setTestCategoryId(e.target.value)}
                    options={availableTestsOptions}
                    className="select-sm md:select-md"
                    placeholder="בחר מבחן"
                  />
                  <FlexBox>
                    <Button
                      className="btn-primary btn-outline btn-sm md:btn-md"
                      onClick={() => addStudentTest(testCategoryId as string)}
                      disabled={!testCategoryId}
                    >
                      הוסף
                    </Button>
                  </FlexBox>
                </Grid>
              </CardBody>
            </Card>
          )}

          <FlexBox className="px-3 lg:px-0">
            <Button
              className="btn-outline btn-primary btn-sm lg:btn-md"
              iconStart={AiOutlineArrowRight}
              href={backUrl}
            >
              חזרה
            </Button>
          </FlexBox>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

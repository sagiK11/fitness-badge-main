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
  Dialog,
  showModal,
} from "@/components";
import { useClassroom, useStudent, useTests, useYearOfStudy } from "@/hooks";
import { GenderEnum, Student, Test } from "@/models";
import { routesTree } from "@/routesTree";
import { formatName, formatDate, formatMeasureUnit, cls } from "@/utils";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight, AiOutlineMail } from "react-icons/ai";

export function StudentDetailsViewView() {
  const { student, availableTestsOptions, addStudentTest } = useStudent();
  const { updateTest, updateTestResult, removeTest } = useTests();
  const { currentYearOfStudy } = useYearOfStudy();
  const { classroom } = useClassroom();
  const router = useRouter();
  const MINIMUM_GRADE = 30;

  const [testCategoryId, setTestCategoryId] = React.useState<string>();
  const [highlighted, setHighlighted] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<{
    id: string;
    msg: string;
  } | null>(null);

  const backUrl = routesTree({
    yearOfStudyId: currentYearOfStudy.id,
    classroomId: router.query.classroomId as string,
  }).classroomDetails;

  React.useEffect(() => {
    if (updateTestResult.isSuccess) {
      setHighlighted(updateTestResult.data.id);
      const timeoutId = setTimeout(() => setHighlighted(null), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [updateTestResult]);

  if (!student) return null;

  const emailUrl = () => {
    const escape = (str: string) => str.replaceAll("\n", "%0D%0A");

    const subject = `ציוני אות הכושר`;
    let body = `שלום ${formatName(student)} ציוני אות הכושר שלך הם:\n`;

    student.tests.forEach((test, i) => {
      const { category, score, grade } = test;
      if (grade < MINIMUM_GRADE) return;

      const measureUnit = formatMeasureUnit(category.measureUnit);
      body += `${i + 1}. ${category.name}:\n`;
      body += `תוצאה: ${score} (${measureUnit}), ציון: ${grade}\n`;
    });
    body += "\n";
    body += `ציון סופי: ${getAverage()}`;

    return escape(`mailto:${student.email}?subject=${subject}&body=${body}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, test: Test) => {
    const score = parseFloat(e.target.value);
    if (typeof score !== "number" || isNaN(score)) {
      setErrorMessage({
        id: test.id,
        msg: "אנא הכנס נתון תקין",
      });
      return;
    }

    setErrorMessage(null);
    updateTest({
      id: test.id,
      score,
      gender: student.gender,
      categoryId: test.categoryId,
    });
  };

  const getAverage = () => {
    const testsWithGrades = student.tests.filter((test) => test.grade >= 30);
    const sum = testsWithGrades.reduce((acc, test) => acc + test.grade, 0);
    return Math.round(sum / (testsWithGrades.length || 1));
  };

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

                <NameValueGroup
                  classNames={{ holder: "col-span-2 md:col-span-1" }}
                  name="אימייל"
                  value={student.email ?? "-"}
                />

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
              <Grid className="grid-cols-9 md:grid-cols-5  gap-2 lg:gap-3 md:items-center bg-gray-200 p-4">
                <FlexBox className="flex-col md:gap-1 col-span-3 md:col-span-1">
                  <Typography bold className="text-base-content">
                    קטגוריה
                  </Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1 col-span-3 md:col-span-1">
                  <Typography bold className="text-base-content">
                    תוצאה
                  </Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1">
                  <Typography bold className="text-base-content">
                    ציון
                  </Typography>
                </FlexBox>
                <FlexBox className="flex-col md:gap-1">
                  <Typography bold className="text-base-content">
                    פעולות
                  </Typography>
                </FlexBox>
              </Grid>

              <FlexBox className="overflow-x-auto flex-col divide-y">
                {student.tests.map((test) => {
                  const { originalArgs, isLoading } = updateTestResult;
                  const isUpdating = originalArgs?.id === test.id && isLoading;
                  const hasScore = test.createdAt !== test.updatedAt;
                  return (
                    <CardBody
                      key={test.id}
                      className="hover:bg-gray-100 transition-all duration-200"
                    >
                      <Grid className="grid-cols-9 md:grid-cols-5 gap-2 lg:gap-8 md:items-center ">
                        <FlexBox className="flex-col md:gap-1 col-span-3 md:col-span-1">
                          <Typography className="text-secondary">
                            {test.category.name} (
                            {formatMeasureUnit(test.category.measureUnit)})
                          </Typography>
                        </FlexBox>

                        <FlexBox className="flex-col md:gap-1 col-span-3 md:col-span-1">
                          <NumberFormatInput
                            debounceTime={1000}
                            defaultValue={hasScore ? test.score : ""}
                            className="input-bordered input-sm md:input-md"
                            onChange={(e) => handleChange(e, test)}
                          />

                          {errorMessage?.id === test.id && (
                            <span className="text-red-500 text-xs">
                              אנא הכנס נתון תקין
                            </span>
                          )}
                        </FlexBox>

                        <FlexBox className="flex-col md:gap-1">
                          <Typography
                            className={cls(
                              "text-info-content transition-all duration-200",
                              {
                                "opacity-60": isUpdating,
                                "text-green-500": highlighted === test.id,
                              }
                            )}
                          >
                            {hasScore ? test.grade : "-"}
                          </Typography>
                        </FlexBox>

                        <FlexBox>
                          <Button
                            className="btn-error btn-sm btn-outline"
                            onClick={() => showModal(test.id)}
                          >
                            מחק
                          </Button>
                        </FlexBox>
                      </Grid>
                      <Dialog id={test.id}>
                        <Typography as="h2" className="font-bold text-lg">
                          מחיקת מבחן
                        </Typography>
                        <Typography className="py-4" as="p">
                          האם אתה בטוח שברצונך למחוק מבחן זה?
                        </Typography>
                        <div className="modal-action justify-between">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <Button>התחרטתי, סגור</Button>
                          </form>
                          <Button
                            className="btn-error"
                            onClick={() => removeTest(test.id)}
                          >
                            מחק
                          </Button>
                        </div>
                      </Dialog>
                    </CardBody>
                  );
                })}
              </FlexBox>
            </CardBody>
          </Card>

          <Card section className="bg-indigo-100">
            <CardTitle className="font-normal justify-center">
              ציון סופי (ממוצע)
              <Typography className="font-bold ">{getAverage()}</Typography>
            </CardTitle>
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
                      onClick={() => {
                        addStudentTest(testCategoryId as string);
                        setTestCategoryId(undefined);
                      }}
                      disabled={!testCategoryId}
                    >
                      הוסף
                    </Button>
                  </FlexBox>
                </Grid>
              </CardBody>
            </Card>
          )}

          <FlexBox className="px-3 lg:px-0 justify-between">
            <Button
              className="btn-outline btn-primary btn-sm lg:btn-md"
              iconStart={AiOutlineArrowRight}
              href={backUrl}
            >
              חזרה
            </Button>

            {student.email && (
              <Button
                className="btn btn-success btn-outline btn-sm lg:btn-md"
                iconEnd={AiOutlineMail}
                href={emailUrl()}
              >
                שלח תוצאות באימייל
              </Button>
            )}
          </FlexBox>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

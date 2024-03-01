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
  Select,
  Breadcrumbs,
  FileInput,
  NameValueGroup,
  StudentsExcelExample,
} from "@/components";
import { useClassroom, useUser } from "@/hooks";
import { useAvailableClassroomStudents } from "@/hooks/use-available-classroom-students";
import { GenderEnum, Student } from "@/models";
import { routesTree } from "@/routesTree";
import { formatName, formatDate } from "@/utils";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export function ClassroomDetailsView() {
  const router = useRouter();
  const user = useUser();
  const classroomId = router.query.classroomId as string;
  const yearOfStudyId = router.query.yearOfStudyId as string;
  const { addClassroomStudent, classroom, uploadStudents, isUploading } =
    useClassroom();
  const { availableStudentsOptions } = useAvailableClassroomStudents();

  const [studentId, setStudentId] = React.useState<string>();

  return (
    <ViewWrapper title="Classroom Details">
      <RootLayout>
        <Container className="gap-4 lg:gap-6">
          <Breadcrumbs
            items={[
              { label: "בית", href: routesTree().home },
              { label: classroom?.name as string },
            ]}
          />
          <Card section>
            <CardTitle>פרטי הכיתה</CardTitle>
            <CardBody>
              <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
                <NameValueGroup name="שם" value={classroom?.name} />

                <NameValueGroup
                  name="מגדר"
                  value={
                    classroom?.gender === GenderEnum.male ? "בנים" : "בנות"
                  }
                />

                <NameValueGroup
                  name="תאריך יצירה"
                  value={formatDate(classroom?.createdAt)}
                />

                <NameValueGroup
                  name="תאריך עדכון אחרון"
                  value={formatDate(classroom?.updatedAt)}
                />
              </Grid>
            </CardBody>
          </Card>

          <Card section>
            <CardTitle>תלמידים</CardTitle>

            {classroom?.studentEnrollments?.length === 0 && (
              <CardBody>
                <Typography>לכיתה זו אין תלמידים</Typography>
                <FlexBox className="gap-2">
                  <FileInput
                    label="העלה מקובץ אקסל"
                    className="file-input-secondary"
                    disabled={isUploading}
                    onChange={(e) => {
                      const data = new FormData();
                      data.append("file", e.target.files?.[0] as File);
                      uploadStudents({
                        classroomId,
                        yearOfStudyId,
                        schoolId: user.schoolId,
                        data,
                      });
                    }}
                  />
                </FlexBox>
                <StudentsExcelExample />
              </CardBody>
            )}

            {classroom?.studentEnrollments?.map((enrollment) => (
              <CardBody key={enrollment.id} hover>
                <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
                  <NameValueGroup
                    name="שם"
                    value={formatName(enrollment.student)}
                  />

                  <NameValueGroup
                    name="טלפון"
                    value={enrollment.student.phone ?? "-"}
                  />

                  <NameValueGroup
                    name="אימייל"
                    value={enrollment.student.email ?? "-"}
                  />

                  <NameValueGroup
                    name="תאריך עדכון אחרון"
                    value={formatDate(enrollment.student.updatedAt)}
                  />

                  <FlexBox className="flex-col md:gap-1">
                    <Button
                      className="btn-secondary btn-sm self-start"
                      iconEnd={AiOutlineArrowLeft}
                      href={
                        routesTree({
                          yearOfStudyId: yearOfStudyId as string,
                          classroomId: classroomId as string,
                          studentId: enrollment.student.id,
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

          {availableStudentsOptions.length > 0 && (
            <Card section>
              <CardTitle>הוסף תלמיד</CardTitle>
              <CardBody>
                <Grid className="grid-cols-2 md:grid-cols-5 gap-1 md:gap-3 items-center">
                  <Select
                    onChange={(e) => setStudentId(e.target.value)}
                    options={availableStudentsOptions}
                    className="select-sm md:select-md"
                    placeholder="בחר תלמיד"
                  />
                  <FlexBox>
                    <Button
                      className="btn-primary btn-outline btn-sm md:btn-md"
                      onClick={() =>
                        addClassroomStudent({
                          classroomId: classroomId as string,
                          studentId,
                        })
                      }
                      disabled={!classroomId || !studentId}
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
              href={
                routesTree({ yearOfStudyId: yearOfStudyId as string })
                  .yearOfStudy
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

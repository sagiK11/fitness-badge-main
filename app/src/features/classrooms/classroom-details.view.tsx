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
                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">שם</Typography>
                  <Typography bold>{classroom?.name}</Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">מגדר</Typography>
                  <Typography bold>
                    {classroom?.gender === GenderEnum.male ? "בנים" : "בנות"}
                  </Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">
                    תאריך יצירה
                  </Typography>
                  <Typography bold>
                    {formatDate(classroom?.createdAt)}
                  </Typography>
                </FlexBox>
                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">
                    תאריך עדכון אחרון
                  </Typography>
                  <Typography bold>
                    {formatDate(classroom?.updatedAt)}
                  </Typography>
                </FlexBox>
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
                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">שם</Typography>
                    <Typography bold>
                      {formatName(enrollment.student)}
                    </Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">טלפון</Typography>
                    <Typography bold>
                      {enrollment.student.phone ?? "-"}
                    </Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">אימייל</Typography>
                    <Typography bold>
                      {enrollment.student.email ?? "-"}
                    </Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">
                      תאריך עדכון אחרון
                    </Typography>
                    <Typography bold>
                      {formatDate(enrollment.student.updatedAt)}
                    </Typography>
                  </FlexBox>

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

const StudentsExcelExample = () => {
  const mock: Partial<Student>[] = [
    {
      israelId: "123456781",
      firstName: "ישראל",
      lastName: "ישראלי",
      phone: "0501234561",
      email: "israel@gmail.com",
    },
    {
      israelId: "123456782",
      firstName: "דנה",
      lastName: "כהן",
      phone: "0501234562",
      email: "dana@gmail.com",
    },
    {
      israelId: "123456783",
      firstName: "שני",
      lastName: "גרינברג",
      phone: "0501234563",
      email: "shani@gmail.com",
    },
    {
      israelId: "123456784",
      firstName: "רונה",
      lastName: "לוי",
      phone: "0501234564",
      email: "rona@gmail.com",
    },
  ];

  return (
    <div className="flex flex-col gap-1 overflow-x-auto">
      <Typography className="font-bold">דוגמה לקובץ אקסל:</Typography>
      <table className="max-w-sm ">
        <tbody className="bg-gray-100">
          {mock.map((student) => {
            return (
              <tr key={student.israelId}>
                <td className="border text-center border-gray-400 px-2 py-1">
                  {student.israelId}
                </td>
                <td className="border text-center border-gray-400 px-2 py-1">
                  {student.firstName}
                </td>
                <td className="border text-center border-gray-400 px-2 py-1">
                  {student.lastName}
                </td>
                <td className="text-center border border-gray-400 border-y px-2 py-1">
                  {student.phone}
                </td>
                <td className="text-center border border-gray-400 border-y px-2 py-1">
                  {student.email}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
